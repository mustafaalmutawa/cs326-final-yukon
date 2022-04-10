import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import { faker } from '@faker-js/faker';

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
        if (item['id'] === id){
            return true;
        }
    }
    return false;
}

function getIndex(json, id) { 
    for (const [index, item] of json.entries()){
        if (item['id'] === id){
          return index;
        }
    }
    return -1;
}

async function getProduct(response, id) {
    products = reload(product_database);
    index = getIndex(products, id);

    if (index !== -1) 
        response.status(200).json(products[index]);  
    else
        response.status(404).json({ error: 'Product id not found' });
}

async function register(response, body) {
    const fakeId = Math.floor(Math.random()*90000) + 10000;
    const fakeObj = {"id": fakeId, "name": faker.name.firstName(), "phone number": faker.phone.phoneNumber()}   
    users.push(fakeObj)
    save(users, user_database);
    response.json(fakeObj);
}

async function login(response, body) {
    const fakeObj = {"name": faker.name.firstName(), "phone number": faker.phone.phoneNumber()}
    response.json(fakeObj)
}

async function createProduct(response, body) { 	
    const fakeId = Math.floor(Math.random()*90000) + 10000;
    const fakeObj = {"id" : fakeId, "name": faker.commerce.product(), "brand": faker.company.companyName(), "price": faker.finance.amount()}
    products.push(fakeObj);
    save(products, product_database);
    response.json(fakeObj);
}

async function buyProduct(response, body) {
    const fakeId = Math.floor(Math.random()*90000) + 10000;
    const fakeObj = {"id": fakeId, "name": faker.commerce.product(), "brand": faker.company.companyName(), "price": faker.finance.amount()}
    response.json(fakeObj);
}

async function getProfile(response, id) {
    const fakeId = Math.floor(Math.random()*90000) + 10000;
    response.json(`User profile found with id ${fakeId}`);
}

async function deleteProduct(response, id) {
    
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

app.post('/register', async (request, response) => {
  register(response, request.body);
});

app.post('/login', async (request, response) => {
  login(response, request.body);
});

app.post('/register', async (request, response) => {
  console.log(request.body);
  const details = request.body;
  register(response, details);
});

app.post('/product', async (request, response) => {
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

app.get('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

