import express from 'express';
import logger from 'morgan';

async function getProduct(response, pid) {
  response.json({ info: `Product found with pid ${pid}` });
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

app.get('*', async (request, response) => {
  response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
