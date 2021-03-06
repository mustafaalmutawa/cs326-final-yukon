import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import { faker } from '@faker-js/faker';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


let products = [];
let users = [];

const product_database = 'products.json';
const user_database = 'users.json';

async function reload(filename) {
    try {
        const data = await readFile(filename, { encoding: 'utf8' });
        if (data === '')
            return [];
        else
            return JSON.parse(data);
    } 
    catch (err) {
        console.log(err);
    }
}

async function save(json_arr, filename) { 
    try {
        const data = JSON.stringify(json_arr);
        await writeFile(filename, data, { encoding: 'utf8' });
    } 
    catch (err) {
        console.log(err);
  }
}

function itemExists(json_arr, id) {
    for (const item of json_arr){
        if ("id" in item) {
            if (item['id'] === id){
                return true;
            }
        }
    }
    return false;
}

function getIndex(json_arr, id) { 
    for (const [index, item] of json_arr.entries()){
        if ("id" in item) {
            if (item['id'] === id){
            return index;
            }
        }
    }
    return -1;
}

async function getProduct(response, id) {
    products = await reload(product_database);
    const index = getIndex(products, parseInt(id));

    if (index !== -1) 
        response.status(200).json(products[index]);  
    else
        response.status(404).json({ error: 'Product id not found' });
}

async function createProduct(response, body) { 	
    products = await reload(product_database);
    let id = Math.floor(Math.random()*90000) + 10000;
    while (itemExists(products, id)) {
        id = Math.floor(Math.random()*90000) + 10000;
    }
    const obj = {"id": id, "itemName": body.itemName, "price": body.price, "category": body.category, "condition": body.condition, "description": body.description, "images": body.images, "location": body.location, "shipping": body.shipping, "shippingPrice": body.shippingPrice, "pickup": body.pickup, "payment": body.payment}
    products.push(obj);
    await save(products, product_database);
    response.status(200).json(obj);
}

async function buyProduct(response, body) {
    const fakeId = Math.floor(Math.random()*90000) + 10000;
    const fakeObj = {"id": fakeId, "name": faker.commerce.product(), "brand": faker.company.companyName(), "price": faker.finance.amount()}
    response.status(200).json(fakeObj);
}

async function deleteProduct(response, id) {
    products = await reload(product_database);
    const index = getIndex(products, parseInt(id));

    if (index == -1) {   
        response.status(404).json({ error: 'Product id not found' });
    }
    else {
        products.splice(index, 1);
        await save(products, product_database);
        response.status(200).json("Product successfully deleted");
    }
}

async function getUserProfile(response, id) {
    users = await reload(user_database);
    const index = getIndex(users, parseInt(id));

    if (index !== -1) 
        response.status(200).json(users[index]);  
    else
        response.status(404).json({ error: 'User id not found' });
}

async function register(response, body) {
    users = await reload(user_database);
    const obj = {"id": body.username, "email": body.email, "password": body.password}   
    users.push(obj);
    await save(users, user_database);
    response.status(200).json(obj);
}

async function login(response, body) {
    const details = {'username': body.username, 'password': body.password}
    response.status(200).json(details)
}

async function deleteUser(response, id) {
    users = await reload(user_database);
    console.log(id);
    const index = getIndex(users, id);

    if(index == -1){   
        response.status(404).json({ error: 'User id not found' });
    }
    else {
        users.splice(index, 1);
        await save(users, user_database);
        response.status(200).json("User successfully deleted");
    }
}

async function dump(response, database) {
    let json = [];

    if (database === "product_database") {
        json = await reload(product_database);
        products = json;
    }
    else if (database === "user_database") {
        json = await reload(user_database);
        users = json;
    }
    console.log(json)
    response.status(200).json(json);
}

const app = express(); 
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('client'));

app.get('/product', async (request, response) => {
    const details = request.query;
    response.sendFile('/client/product.html', {root: __dirname })
});

app.post('/product/new', async (request, response) => {
    const details = request.body;
    console.log(request.body)
    createProduct(response, details);
});

app.post('/product/buy', async (request, response) => {
    const details = request.body;
    buyProduct(response, details);
});

app.delete('/product/delete', async (request, response) => {
    const details = request.query;
    deleteProduct(response, details.id);
});

app.get('/user', async (request, response) => {
    const details = request.query;
    response.sendFile('/client/user_profile.html', {root: __dirname })
});

app.post('/user/new', async (request, response) => {
    console.log(request.body);
    const details = request.body;
    register(response, details);
});

app.put('/user/update', async (request, response) => {
    response.status(200).json({sucess: 'updated'});
});

app.post('/user/login', async (request, response) => {
    login(response, request.body);
    console.log(request.body);
});

app.delete('/user/delete', async (request, response) => {
    const details = request.body;
    users = await reload(user_database);
    deleteUser(response, users[users.length-1].id);
});

app.get('/login', async (request, response) => {
    const details = request.query;
    response.sendFile('/client/Login.html', {root: __dirname })
});

app.get('/register', async (request, response) => {
    const details = request.query;
    response.sendFile('/client/register.html', {root: __dirname })
});

app.get(['/homepage', '/'], async (request, response) => {
    const details = request.query;
    response.sendFile('/client/Homepage.html', {root: __dirname })
});

app.get('/listing', async (request, response) => {
    const details = request.query;
    response.sendFile('/client/listing.html', {root: __dirname })
});

app.get('/dump', async (request, response) => {
    const details = request.query;
    dump(response, details.database);
});

app.get('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});