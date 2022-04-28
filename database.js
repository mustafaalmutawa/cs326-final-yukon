import 'dotenv/config';
import pg from 'pg';

// Get the Pool class from the pg module.
const { Pool } = pg;

export class Database {
  constructor(dburl) {
    this.dburl = dburl;
  }

  async connect() {
    // Create a new Pool. The Pool manages a set of connections to the database.
    // It will keep track of unused connections, and reuse them when new queries
    // are needed. The constructor requires a database URL to make the
    // connection. You can find the URL of your database by looking in Heroku
    // or you can run the following command in your terminal:
    //
    //  heroku pg:credentials:url -a APP_NAME
    //
    // Replace APP_NAME with the name of your app in Heroku.
    this.pool = new Pool({
      connectionString: this.dburl,
      ssl: { rejectUnauthorized: false }, // Required for Heroku connections
    });

    // Create the pool.
    this.client = await this.pool.connect();

    // Init the database.
    await this.init();
  }

  async init() {
    const queryText = `
      create table if not exists UserDatabase (
        id varchar(30),
        email varchar(30),
        password varchar(30)
      );
      create table if not exists ProductDatabase (
        id integer,
        name varchar(30),
        brand varchar(30),
        price integer
      );
    `;
    const res = await this.client.query(queryText);
  }

  // Close the pool.
  async close() {
    this.client.release();
    await this.pool.end();
  }
  
  async readAllProducts() {
    const queryText = 'SELECT * FROM ProductDatabase';
    const res = await this.client.query(queryText);
    return res.rows;
  }
  async readAllUsers() {
    const queryText = 'SELECT * FROM UserDatabase';
    const res = await this.client.query(queryText);
    return res.rows;
  }
}