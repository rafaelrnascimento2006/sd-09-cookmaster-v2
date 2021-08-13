const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();

app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use('/users', require('./users/users.routes'));
app.use('/login', require('./login/login.routes'));
app.use('/recipes', require('./recipes/recipes.routes'));
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;
