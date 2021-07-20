const rescue = require('express-rescue');
const { ObjectId } = require('mongodb');
const service = require('../services/recipes');
const { CREATED, OK } = require('../constants/http.json');

const create = rescue(async (request, response, next) => {
  const { name, ingredients, preparation } = request.body;
  const { _id: userId } = request.user;
  const newRecipe = await service
    .create({ name, ingredients, preparation, userId });
  if (newRecipe.err) return next(newRecipe.err);
  response.status(CREATED).json({
    recipe: {
      _id: newRecipe,
      name,
      ingredients,
      preparation,
      userId,
    },
  });
});

const find = rescue(async (request, response, next) => {
  const Recipes = await service.find(request.query);
  if (Recipes.err) return next(Recipes.err);
  response.status(OK).json(Recipes);
});

const findOne = rescue(async (request, response, next) => {
  const { id } = request.params;
  const Recipe = await service.findOne(id);
  if (Recipe.err) return next(Recipe.err);
  response.status(OK).json(Recipe);
});

const updateOne = rescue(async (request, response, next) => {
  const { params: { id }, user: { _id, role }, body: { name, ingredients, preparation } } = request;
  const { userId } = await service.findOne(id);
  if (role === 'admin' || ObjectId(userId).toString() === ObjectId(_id).toString()) {
    const newRecipe = await service.updateOne(userId, { name, ingredients, preparation });
    if (newRecipe.err) return next(newRecipe.err);
    return response.status(OK).json({
      _id: id,
      name,
      ingredients,
      preparation,
      userId,
    });
  }
  return { err: { code: 'unauthorized', message: 'unable to edit recipe' } };
});

module.exports = { create, find, findOne, updateOne };