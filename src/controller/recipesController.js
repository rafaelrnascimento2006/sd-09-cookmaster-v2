const recipesServices = require('../services/recipes');

const registerRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const response = await recipesServices.registerRecipe(name, ingredients, preparation, userId);
  return res.status(response.status).json(response.payload);
};

const getRecipes = async (req, res) => {
  const response = await recipesServices.getRecipes();
  return res.status(response.status).json(response.payload);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const response = await recipesServices.getRecipeById(id);
  return res.status(response.status).json(response.payload);
};

module.exports = { registerRecipe, getRecipes, getRecipeById };