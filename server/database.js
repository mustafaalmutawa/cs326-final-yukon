import 'dotenv/config';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

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
        this.listingsHTML = this.db.collection('listingsHTML');
    }

    // Close the pool.
    async close() {
        this.client.close();
    }

    async createProduct(product_obj){
        const res = await this.products.insertOne(product_obj);

        // Note: the result received back from MongoDB does not contain the
        // entire document that was inserted into the database. Instead, it
        // only contains the _id of the document (and an acknowledged field).
        return res.insertedId.toString();
    }

    async createUser(username, password) {
        const res = await this.users.insertOne({username, password});
        return res;
    }

    async getProduct(id) {
        const res = await this.products.findOne({_id: ObjectId(id)});
        return res;
    }

    async getUser(id) {
        const res = await this.users.findOne({_id: ObjectId(id)});
        return res;
    }

    async getUserByName(name) {
        const res = await this.users.findOne({name: name});
        return res;
    }

    async updateProduct(id) {

    }

    async updateUser(id) {

    }

    async deleteProduct(id) {

    }

    async deleteUser() {
        let usrs = await this.getAllUsers();
        //console.log(usrs);
        console.log(usrs[usrs.length-1]._id)
        const res = await this.users.deleteOne({_id: usrs[usrs.length-1]._id});
        return res;

    }

    async addProductHTML(id, html) {
        const res = await this.listingsHTML.insertOne({_id: ObjectId(id), html: html});
        return res;
    }

    async getMostRecentProduct() {
        const res = await this.getAllProducts();
        return res[res.length - 1];
    }

    async getAllProducts() {
        const res = await this.products.find({}).toArray();
        return res;
    }

    async getAllUsers() {
        const res = await this.users.find({}).toArray();
        return res;
    }

    async getAllHTMLListings() {
        const res = await this.listingsHTML.find({}).toArray();
        return res;
    }
}