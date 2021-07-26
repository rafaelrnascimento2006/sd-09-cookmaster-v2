// Users
const INVALID_NEW_USER = {
  code: 400,
  message: 'Invalid entries. Try again.',
};

const EMAIL_ALREADY_EXISTS = {
  code: 409,
  message: 'Email already registered',
};

// Login
const INVALID_LOGIN_FORMAT = {
  code: 401,
  message: 'All fields must be filled', 
};

const INVALID_LOGIN_DATA = {
  code: 401,
  message: 'Incorrect username or password',
};

// Recipes
const INVALID_RECIPE_DATA = {
  code: 400,
  message: 'Invalid entries. Try again.',
};

const RECIPE_NOT_FOUND = {
  code: 404,
  message: 'recipe not found',
};

// Invalid Token
const INVALID_TOKEN = {
  code: 401,
  message: 'jwt malformed',
};

const MISSING_TOKEN = {
  code: 401,
  message: 'missing auth token',
};

module.exports = {
  INVALID_NEW_USER,
  EMAIL_ALREADY_EXISTS,
  INVALID_LOGIN_FORMAT,
  INVALID_LOGIN_DATA,
  INVALID_RECIPE_DATA,
  RECIPE_NOT_FOUND,
  INVALID_TOKEN,
  MISSING_TOKEN,
};
