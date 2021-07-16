const express = require('express');
const rescue = require('express-rescue');

const loginController = require('../controllers/loginController');

const loginRoute = express.Router();

loginRoute.post('/', rescue(loginController.login));

module.exports = loginRoute;