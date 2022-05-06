import 'dotenv/config';
import express from 'express';
import expressSession from 'express-session';
import users from './users.js';
import auth from './auth.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Database } from './database.js';

// We will use __dirname later on to send files back to the client.
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

const sessionConfig = {
  // set this encryption key in Heroku config (never in GitHub)!
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

class Server {
    constructor(dburl) {
        this.dburl = dburl;
        this.app = express();
        this.app.use('/', express.static('./client'));
        this.app.use(expressSession(sessionConfig));
        this.app.use(express.json({limit: '100mb'}));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.set('view engine', 'ejs');
        auth.configure(this.app);
    }

    checkLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            // If we are authenticated, run the next route.
            next();
        }
        else {
            // Otherwise, redirect to the login page.
            res.redirect('/login');
        }
    }

    async initRoutes() {
        const self = this;

        this.app.get('/product', async (request, response) => {
            const pid = request.query.id;
            const res = await self.db.getProduct(pid);
            response.render('product.ejs', res);
        });

        this.app.get('/product/recent', async (request, response) => {
            const res = await self.db.getMostRecentProduct();
            response.json(res);
        });

        this.app.post('/product/new', async (req, res) => {
            //returned id is the string portion of the ObjectId
            const id = await this.db.createProduct(req.body);
            res.json({id: id});    
        });

        this.app.post('/product/html', async (req, res) => {
            const data = req.body;
            await this.db.addProductHTML(data.id, data.html, data.url);   
        });

        this.app.get('/product/all', async (request, response) => {
            const res = await self.db.getAllHTMLListings();
            response.json(res);
        })

        this.app.get('/products', async (request, response) => {
            const res = await self.db.getAllProducts();
            response.json(res);
        })

        this.app.post('/product/buy', async (request, response) => {
        });

        this.app.get('/user', async (request, response) => {
            //Note: usernames are assumed to be unique
            let res = await self.db.getUserByName(request.user);
            if (res === null){
                res = {username : 'Default User'};
            }
            response.render('user_profile.ejs', res);
        });

        this.app.post('/user/new', async (request, response) => {
            const { username, password } = request.body;
            if (users.addUser(username, password)) {
                response.redirect('/login');
            } 
            else {
                response.redirect('/register');
            }
        });

        this.app.put('/user/update', async (request, response) => {
            response.status(200).json({sucess: 'updated'});
        });

        this.app.put('/product/update', async (request, response) => {
            const {id, itemName, price, category, condition, description, 
                images, location, shipping, shippingPrice, pickup, payment} = request.body;
            const data = await self.db.updateProduct(id, itemName, price, category, condition, description, 
                images, location, shipping, shippingPrice, pickup, payment);
            response.redirect("/user");
        });

        this.app.post('/user/login', auth.authenticate('local', {
                // use username/password authentication
                successRedirect: '/user', // when we login, go to /private
                failureRedirect: '/login', // otherwise, back to login
            })
        );

        this.app.delete('/user/delete', async (request, response) => {
            const id = await self.db.deleteUser();
            response.send(JSON.stringify(id))
            console.log(id);
        });

        this.app.get('/login', async (request, response) => {
            response.sendFile('./client/Login.html', {root: __dirname })
        });

        this.app.get('/register', async (request, response) => {
            response.sendFile('./client/register.html', {root: __dirname })
        });

        this.app.get(['/homepage', '/'], async (request, response) => {
            response.sendFile('./client/Homepage.html', {root: __dirname })
        });

        this.app.get('/listing', async (request, response) => {
            response.sendFile('./client/listing.html', {root: __dirname })
        });
        
        this.app.get('/listing/update', async (request, response) => {
            response.sendFile('./client/update_listing.html', {root: __dirname })
        });
    }

    async initDb() {
        this.db = new Database(this.dburl);
        await this.db.connect();
    }

    async start() {
        await this.initDb();
        await this.initRoutes();   
        //--- testing ----
        /*await this.db.createUser("example@gmail.com", "password");
        console.log(await this.db.getAllUsers());
        await this.db.createProduct("chair", 35, "furniture", "new", "chair ok", "", "Sylvan", false, 0, true, "venmo")
        console.log(await this.db.getAllProducts());*/
        //----------------
        const port = process.env.PORT || 3000;

        this.app.listen(port, () => {
            console.log(`Server listening on port ${port}!`);
        });
    }
}

const server = new Server(process.env.DATABASE_URL);
server.start();