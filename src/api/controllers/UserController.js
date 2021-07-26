const rescue = require('express-rescue');

const Service = require('../services/UserService');
const { OK } = require('../middleware/httpStatus');

const createUser = rescue(async (req, res, next) => {
  const { name, email, password, role = 'user' } = req.body;

  const user = await Service.createUser({ name, email, password, role });

  if (user.error) {
    return next(user.error);
  }

  return res.status(201).json(user);
});

const login = rescue(async (req, res, next) => {
  // const { email, password } = req.body;
  const userLogin = await Service.login(req.body);

  if (userLogin.error) {
    return next(userLogin.error);
  }

  res.status(OK).json(userLogin);
});

module.exports = {
  createUser,
  login,
};