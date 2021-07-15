const RecipesServices = require('../services/RecipesServices');

const newRecipeValidator = (req, _res, next) => {
  const { name, ingredients, preparation } = req.body;
  const data = RecipesServices.recipeVerifier(name, ingredients, preparation);
  if (data.error) { return next(data); }
  return next();
};

const newRecipeAdd = async (req, res, next) => {
  const { id, name, ingredients, preparation } = req.body;
  const data = await RecipesServices.recipeAdd({ name, ingredients, preparation, userId: id });
  if (data.error) { return next(data); }
  return res.status(201).json({ recipe: data });
};

const recipesGetAll = async (_req, res, next) => {
  const data = await RecipesServices.recipesGetAll();
  if (data.error) { return next(); }
  return res.status(200).json(data);
};

const recipesGetOne = async (req, res, next) => {
  const { id } = req.params;
  const data = await RecipesServices.recipesGetOne(id);
  if (data.error) { return next(data); }
  return res.status(200).json(data);
};

module.exports = {
  newRecipeValidator,
  newRecipeAdd,
  recipesGetAll,
  recipesGetOne,
};
