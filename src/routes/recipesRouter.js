const express = require('express');

const recipesRouter = express.Router();

const validateJWT = require('../middlewares/validateJWT');
const validateUser = require('../middlewares/validateUser');

const {
  registerRecipeController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeByIdController,
  deleteRecipeByIdController,
  addImageToRecipeController,
} = require('../controllers/recipesController');

recipesRouter.post('/', [
  validateJWT,
  registerRecipeController,
]);
recipesRouter.get('/', getAllRecipesController);
recipesRouter.get('/:id', getRecipeByIdController);
recipesRouter.put('/:id', [
  validateJWT,
  validateUser,
  updateRecipeByIdController,
]);
recipesRouter.delete('/:id', [
  validateJWT,
  validateUser,
  deleteRecipeByIdController,
]);

recipesRouter.put('/:id/image', [
  validateJWT,
  validateUser,
  addImageToRecipeController,
]);

module.exports = recipesRouter;