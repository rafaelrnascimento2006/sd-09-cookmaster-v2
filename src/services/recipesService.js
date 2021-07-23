const recipesModel = require('../models/recipesModel');
const { validateError, schema } = require('./schemas/recipesSchema');

const createRecipe = async (recipe) => {
  const { userId: _, ...recipeData } = recipe;

  const { error } = schema.validate(recipeData);

  if (error) throw validateError(400, error.message);

  const result = await recipesModel.createRecipe(recipe);

  return { result, status: 201 };
};

const findAll = async () => {
  const result = await recipesModel.getAll();

  return { result, status: 200 };
};

const findById = async (id) => {
  const result = await recipesModel.getById(id);

  if (!result) {
    return { status: 404, message: 'recipe not found' };
  }

  return { status: 200, result };
};

const update = async (recipeId, recipe, user) => {
  const { role, _id: id } = user;
  const { userId } = await recipesModel.getById(recipeId);

  if (role === 'user' && id !== userId) throw validateError(401, 'unauthorized');

  await recipesModel.update(recipeId, recipe);

  const result = { _id: recipeId, ...recipe, userId };

  return { status: 200, result };
};

const deleteRecipe = async (recipeId, user) => {
  const { role, _id: id } = user;
  const { userId } = await recipesModel.getById(recipeId);

  if (role === 'user' && id !== userId) throw validateError(401, 'unauthorized');

  await recipesModel.deleteRecipe(recipeId);

  return { status: 204 };
};

module.exports = {
  createRecipe,
  findAll,
  findById,
  update,
  deleteRecipe,
};
