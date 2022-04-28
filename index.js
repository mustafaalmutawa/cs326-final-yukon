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

const app = express();
const port = process.env.PORT || 3000;

class Server {
  constructor(dburl) {
    this.dburl = dburl;
    this.app = express();
    this.app.use('/', express.static('client'));
    this.pp.use(expressSession(sessionConfig));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static('client'));
    auth.configure(app);
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
      response.sendFile('/client/product.html', {root: __dirname })
    });
    this.app.post('/product/new', async (req, res) => {
    });
    this.app.post('/product/buy', async (req, res) => {
    });
    this.app.get('/user', async (req, res) => {
      response.sendFile('/client/user_profile.html', {root: __dirname })

    });
    this.app.post('/user/new', async (req, res) => {
    });
    this.app.put('/user/update', async (req, res) => {
    });
    this.app.delete('/user/delete', async (request, response) => {
    });
    this.app.get('/login', async (request, response) => {
      response.sendFile('/client/Login.html', {root: __dirname })
    });
    this.app.get('/register', async (request, response) => {
      response.sendFile('/client/register.html', {root: __dirname })
    });
    this.app.get(['/homepage', '/'], async (request, response) => {
      response.sendFile('/client/Homepage.html', {root: __dirname })
    });
    this.app.get('/listing', async (request, response) => {
      response.sendFile('/client/listing.html', {root: __dirname })
    });
  
   
  }

  async initDb() {
    this.db = new Database(this.dburl);
    await this.db.connect();
  }

  async start() {
    await this.initRoutes();
    await this.initDb();
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`PeopleServer listening on port ${port}!`);
    });
  }
}

const server = new Server(process.env.DATABASE_URL);
server.start();