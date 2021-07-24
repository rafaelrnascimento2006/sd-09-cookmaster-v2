const express = require('express');
const bodyParser = require('body-parser').json();
const Err = require('../midd/err');
const Users = require('../controllers/userControler');

const app = express();

app.use(bodyParser);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.post('/users', Users.createNewUser);

app.use(Err); 

module.exports = app;
