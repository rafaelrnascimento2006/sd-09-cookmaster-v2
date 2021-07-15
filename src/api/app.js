const express = require('express');
const rescue = require('express-rescue');

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

app.use((err, _req, res, _next) => res.status(err.statusCode).json({ message: err.message }));

module.exports = app;