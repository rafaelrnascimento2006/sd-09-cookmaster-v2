const express = require('express');
const rescue = require('express-rescue');
const path = require('path');

const bodyParser = require('body-parser');

const routes = require('../routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});

app.use('/users', rescue(routes.users));
app.use('/login', rescue(routes.login));
app.use('/recipes', rescue(routes.recipes));

app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message });
});

module.exports = app;
