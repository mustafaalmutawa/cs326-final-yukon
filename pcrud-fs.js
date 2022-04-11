import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import { faker } from '@faker-js/faker';

let products = [];
let users = [];
let productId = [];
let Userid = [];
const product_database = 'products.json';
const user_database = 'users.json';
const product_ids = 'product-ids.json';
const user_ids = 'user-ids.json';

async function createfakeUserid(){
    Userid = await reload(user_ids);
    let fakeId = Math.floor(Math.random()*90000) + 10000;
    while(Userid.includes(fakeId)){
        fakeId = Math.floor(Math.random()*90000) + 10000
    }
    Userid.push(fakeId);
    await save(Userid,user_ids);
    return fakeId;
}
async function createfakeproductid(){
    productId = await reload(product_ids);
    let fakeId = Math.floor(Math.random()*90000) + 10000;
    while(productId.includes(fakeId)){
        fakeId = Math.floor(Math.random()*90000) + 10000
    }
    productId.push(fakeId);
    await save(productId,product_ids);
    return fakeId;
}
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

async function save(json, filename) { 
    try {
        const data = JSON.stringify(json);
        await writeFile(filename, data, { encoding: 'utf8' });
    } 
    catch (err) {
        console.log(err);
  }
}

async function itemExists(json, id) {
    for (const item of json){
        if (String(item['id']) === id){
            return true;
        }
    }
    return false;
}

function getIndex(json, id) { 
    for (const [index, item] of json.entries()){
        if (String(item['id']) === id){
          return index;
        }
    }
    return -1;
}

async function getProduct(response, id) {
    products = await reload(product_database);
    const index = getIndex(products, id);

    if (index !== -1) 
        response.status(200).json(products[index]);  
    else
        response.status(404).json({ error: 'Product id not found' });
}

async function register(response, body) {
    users = await reload(user_database);
    const fakeId = createfakeUserid();
    const fakeObj = {"id": fakeId, "name": faker.name.firstName(), "phone number": faker.phone.phoneNumber()}   
    users.push(fakeObj);
    await save(users, user_database);
    response.status(200).json(fakeObj);
}

async function login(response, body) {
    const fakeObj = {"name": faker.name.firstName(), "phone number": faker.phone.phoneNumber()}
    response.status(200).json(fakeObj)
}

async function createProduct(response, body) { 	
    products = await reload(product_database);
    const fakeId = createfakeproductid();
    const fakeObj = {"id" : fakeId, "name": faker.commerce.product(), "brand": faker.company.companyName(), "price": faker.finance.amount()}
    products.push(fakeObj);
    await save(products, product_database);
    response.status(200).json(fakeObj);
}

async function buyProduct(response, body) {
    const fakeId = createfakeproductid();
    const fakeObj = {"id": fakeId, "name": faker.commerce.product(), "brand": faker.company.companyName(), "price": faker.finance.amount()}
    //deleteProduct(response, fakeId)
    response.status(200).json(fakeObj);
}

async function getProfile(response, id) {
    users = await reload(user_database);
    const index = getIndex(users, id);

    if (index !== -1) 
        response.status(200).json(users[index]);  
    else
        response.status(404).json({ error: 'User id not found' });
}

async function deleteProduct(response, id) {
    products = await reload(product_database);
    const index = getIndex(products, id);

    if(index == -1){   
        response.status(404).json({ error: 'Product id not found' });
    }
    else {
        products.splice(index, 1);
        await save(products, product_database);
        response.status(200).json("Product successfully deleted");
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
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/client', express.static('client'));

app.get('/product', async (request, response) => {
    const details = request.query;
    getProduct(response, details.id);
});

app.post('/login', async (request, response) => {
    login(response, request.body);
});

app.post('/register', async (request, response) => {
    console.log(request.body);
    const details = request.body;
    register(response, details);
});

app.post('/product/new', async (request, response) => {
    const details = request.body;
    createProduct(response, details);
});

app.post('/buy', async (request, response) => {
    const details = request.body;
    buyProduct(response, details);
});

app.get('/profile', async (request, response) => {
    const details = request.query;
    getProfile(response, details.id);
});

app.delete('/product/delete', async (request, response) => {
    const details = request.query;
    deleteProduct(response, details.id);
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

