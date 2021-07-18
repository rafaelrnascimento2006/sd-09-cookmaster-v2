const recipesModel = require('../models/recipesModel');

const validateRecipe = ({ name, ingredients, preparation }) => {
  const error = { status: 400, message: 'Invalid entries. Try again.' };
  if (!name || !ingredients || !preparation) throw error;
};

const create = async ({ _id }, recipe) => {
  validateRecipe(recipe);
  const schemaRecipe = {
    ...recipe,
    userId: _id,
  };
  const newRecipe = await recipesModel.create(schemaRecipe);
  return {
    recipe: newRecipe,
  };
};

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  return recipes;
};

const getOne = async (id) => {
  const recipe = await recipesModel.getOne(id);
  if (!recipe) {
    const error = { status: 404, message: 'recipe not found' };
    throw error;
  }
  return recipe;
};

const update = async (id, { _id }, recipe) => {
  const newRecipe = await recipesModel.update(id, recipe);
  const schemaRecipe = {
    ...newRecipe,
    userId: _id,
  };
  return schemaRecipe;
};

module.exports = {
  create,
  getAll,
  getOne,
  update,
};
