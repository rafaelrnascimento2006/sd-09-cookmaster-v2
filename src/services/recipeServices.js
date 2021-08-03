const Joi = require('joi');
const { ObjectId } = require('mongodb');
const { validateToken } = require('../middlewares/tokenValidation');
const {
  newRecipeModel,
  getAllRecipesModel,
  getRecipeByIdModel,
  updateRecipeByIdModel,
  deleteRecipeByIdModel,
  uploadImageModel,
  isAdminModel,
} = require('../models/recipeModels');

const NOT_FOUND = 'recipe not found';

const dataValidation = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const retrieveTokenData = async (token) => {
  const decoded = await validateToken(token);
  return decoded;
};

const validateRecipeData = async (recipeData, token) => {
  const { error } = dataValidation.validate(recipeData);
  if (error) return { error: 'Invalid entries. Try again.', status: 400 };

  const validToken = await retrieveTokenData(token);
  if (validToken.error) return validToken;

  return validToken;
};  

const newRecipeService = async (recipeData, token) => {
  const validRecipe = await validateRecipeData(recipeData, token);
  if (validRecipe.error) return validRecipe;

  const { _id } = validRecipe;
  const recipe = { ...recipeData, userId: _id };
  const createRecipe = await newRecipeModel(recipe);

  return { recipe: createRecipe };
};

const getAllRecipesService = async () => {
  const allRecipes = await getAllRecipesModel();
  return allRecipes;
};

// Como validar o ID foi verificado no meu próprio código do Store Manager ObjectId.isValid(id)
const getRecipeByIdService = async (id) => {
  const validId = ObjectId.isValid(id);
  if (!validId) return { error: NOT_FOUND, status: 404 };
  const recipe = await getRecipeByIdModel(id);
  if (!recipe) return { error: NOT_FOUND, status: 404 };
  return recipe;
};

const updateRecipeByIdService = async (newData) => {
  const { id, token, updateData } = newData;
  
  const validToken = await retrieveTokenData(token);
  if (validToken.error) return validToken;

  const validId = ObjectId(id);
  if (!validId) return { error: NOT_FOUND, status: 404 };

  const validRecipe = await validateRecipeData(updateData, token);
  if (validRecipe.error) return validRecipe;
  
  const { _id } = validRecipe;
  const recipeUpdate = { ...updateData, userId: _id, id };
 
  const updatedRecipe = await updateRecipeByIdModel(recipeUpdate);
  return updatedRecipe;
};

const deleteRecipeByIdService = async (id, token) => {
  const validToken = await retrieveTokenData(token);
  if (validToken.error) return validToken;

  const validId = ObjectId(id);
  if (!validId) return { error: NOT_FOUND, status: 404 };

  const recipe = await getRecipeByIdModel(id);
  if (!recipe) return { error: NOT_FOUND, status: 404 };

  const response = await deleteRecipeByIdModel(id);
  console.log(response);
  return response;
};

const adminValidation = async (userId) => {
  const userRole = await isAdminModel(userId);
  if (userRole === 'admin') return true;
  return null;
};

const validateImageUploadData = async (id, token) => {
  const validToken = await retrieveTokenData(token);
  if (validToken.error) return validToken;

  const recipe = await getRecipeByIdModel(id);
  if (!recipe) return { error: NOT_FOUND, status: 404 };

  const { _id } = validToken;
  const recipeUserId = recipe.userId;
  const isAdmin = await adminValidation(_id);
  if (_id === recipeUserId || isAdmin) {
    return null;
  }

  return {
    error: 'missing auth token',
    status: 401,
  };
};

const uploadImageService = async (id, token, image) => {
  const unauthorizedUpload = await validateImageUploadData(id, token);
  if (unauthorizedUpload) return unauthorizedUpload;

  const validId = ObjectId(id);
  if (!validId) return { error: NOT_FOUND, status: 404 };

  const uploadImage = await uploadImageModel(id, image);
  return uploadImage;
};

module.exports = {
  newRecipeService,
  getAllRecipesService,
  getRecipeByIdService,
  updateRecipeByIdService,
  deleteRecipeByIdService,
  uploadImageService,
};