const validate = require('../utils/validateLogin');
const { generateToken } = require('../utils/validateToken');

const create = async (credentials) => {
  const userData = await validate.login(credentials);
  const result = generateToken(userData);
  return { token: result };
};

module.exports = {
  create,
};