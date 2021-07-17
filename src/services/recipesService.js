const recipes = require('../models/recipesModel');
const validate = require('../utils/validateRecipe');
const { verifyToken } = require('../utils/validateToken');

const create = async (recipe, token) => {
  validate.fields(recipe);
  const userId = verifyToken(token);
  const result = await recipes.create(recipe, userId);
  return result;
};

const findAll = async () => {
  const result = await recipes.findAll();
  return result;
};

module.exports = {
  create,
  findAll,
};
