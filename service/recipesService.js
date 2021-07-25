const Joi = require('joi');
const recipesModel = require('../model/recipesModel');
const { validateError } = require('./validateError');

const RecipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const createRecipe = async (recipe, id) => {
  const { error } = RecipeSchema.validate(recipe);
  if (error) throw validateError(400, 'Invalid entries. Try again.');
  const newRecipe = await recipesModel.registerRecipe({ ...recipe, id });
  return newRecipe;
};

module.exports = { createRecipe };