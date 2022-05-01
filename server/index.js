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
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    auth.configure(this.app);
  }
 checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    // If we are authenticated, run the next route.
    next();
  } else {
    // Otherwise, redirect to the login page.
    res.redirect('/login');
  }
}
  async initRoutes() {
    const self = this;
    this.app.get('/product', async (request, response) => {
      response.sendFile('./client/product.html', {root: __dirname })
    });
    this.app.post('/product/new', async (request, response) => {
    });
    this.app.post('/product/buy', async (request, response) => {
    });
    this.app.get('/user', async (request, response) => {
      response.sendFile('./client/user_profile.html', {root: __dirname })
    });
    this.app.post('/user/new', async (request, response) => {
      const { username, password } = req.body;
      if (users.addUser(username, password)) {
        res.redirect('./client/user_profile.html');
      } else {
        res.redirect('/register');
      }
    });
    this.app.put('/user/update', async (request, response) => {
    });
    this.app.post('/user/login', async (request, response) => {
      auth.authenticate('local', {
        // use username/password authentication
        successRedirect: './client/Homepage.html', // when we login, go to /private
        failureRedirect: './login.html', // otherwise, back to login
      })
    });
    this.app.delete('/user/delete', async (request, response) => {
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
  }
  async initDb() {
    this.db = new Database(this.dburl);
    await this.db.connect();
  }
  async start() {
    await this.initRoutes();
    await this.initDb();
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