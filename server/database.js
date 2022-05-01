import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

export class Database {
    constructor(dburl) {
        this.dburl = dburl;
    }

    async connect() {
        this.client = await MongoClient.connect(this.dburl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
        });

        // Get the database.
        this.db = this.client.db('ProductsUsersDB');

        // Init the database.
        await this.init();
    }

    async init() {
        this.products = this.db.collection('products');
        this.users = this.db.collection('users');
    }

    // Close the pool.
    async close() {
        this.client.close();
    }

    async createProduct(itemName, price, category, condition, description, 
    images, location, shipping, shippingPrice, pickup, payment) {

        const res = await this.products.insertOne({itemName, price, 
        category, condition, description, images, location, shipping, 
        shippingPrice, pickup, payment});

        // Note: the result received back from MongoDB does not contain the
        // entire document that was inserted into the database. Instead, it
        // only contains the _id of the document (and an acknowledged field).
        return res;
    }

    async createUser(email, password) {
        const res = await this.users.insertOne({email, password});
        return res;
    }

    async getProduct(id) {

    }

    async getUser(id) {

    }

    async updateProduct(id) {

    }

    async updateUser(id) {

    }

    async deleteProduct(id) {

    }

    async deleteUser(id) {

    }

    async getAllProducts() {
        const res = await this.products.find({}).toArray();
        return res;
    }

    async getAllUsers() {
        const res = await this.users.find({}).toArray();
        return res;
    }
}
