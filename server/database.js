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

    async updateProduct(id, itemName, price, category, condition, description, 
    images, location, shipping, shippingPrice, pickup, payment) {

        const res = await this.products.updateOne({_id: id}, {$set: {itemName: itemName, price: price, 
        category: category, condition: condition, description: description, images: images, 
        location: location, shipping: shipping, shippingPrice: shippingPrice, pickup: pickup, 
        payment: payment}});

        return res;
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

    async getAllProducts() {
        const res = await this.products.find({}).toArray();
        return res;
    }

    async getAllUsers() {
        const res = await this.users.find({}).toArray();
        return res;
    }
}
