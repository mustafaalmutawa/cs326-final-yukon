import express from 'express';
import logger from 'morgan';

import { faker } from '@faker-js/faker';

async function getProduct(response, pid) {
  const fakePid = Math.floor(Math.random()*90000) + 10000;
  response.json(`Product found with pid ${fakePid}`);
}

async function register(response, body) {
  const fakeObj = {"name": faker.name.firstName(), "phone number": faker.phone.phoneNumber()}
  response.json(fakeObj);
}

async function login(response, body) {
  const fakeObj = {"name": faker.name.firstName(), "phone number": faker.phone.phoneNumber()}
  response.json(fakeObj)
}

async function createProduct(response, body) { 	
  const fakePid = Math.floor(Math.random()*90000) + 10000;
  const fakeObj = {"name": faker.commerce.product(), "pid": fakePid, "brand": faker.company.companyName()}
  response.json(fakeObj);
}

async function buyProduct(response, body) {
  const fakePid = Math.floor(Math.random()*90000) + 10000;
  const fakeObj = {"name": faker.commerce.product(), "pid": fakePid, "brand": faker.company.companyName()}
  response.json(fakeObj);
}

const app = express(); 
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/client', express.static('client'));

app.get('/product', async (request, response) => {
  const details = request.query;
  getProduct(response, details.pid);
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

app.get('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
