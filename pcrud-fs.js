import express from 'express';
import logger from 'morgan';

async function getProduct(response, pid) {
  response.json(`Product found with pid ${pid}`);
}

async function register(response, body) {
  response.json({username: body.username, password: "*****"});
}

async function login(response, body) {
  response.json({username: body.username, password: "welcome!"})
}

async function createProduct(response, body) {
  response.json(body);
}

async function buyProduct(response, body) {
  response.json(body);
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
  console.log(request.body);
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
