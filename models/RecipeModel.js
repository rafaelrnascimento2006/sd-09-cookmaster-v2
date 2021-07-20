const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const newRecipe = await connection()
  .then((db) => db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation,
    userId,
  }));

  return newRecipe.ops[0];
};

const getAll = async () => {
  const recipes = await connection()
  .then((db) => db.collection('recipes').find().toArray());

  return recipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const recipe = await connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));

  return recipe;
};

const update = async (id, name, ingredients, preparation) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const recipeUpdate = await connection()
  .then((db) => db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
    { returnOriginal: false },
  ));

  return recipeUpdate.value;
};

const deleteRecipe = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const recipe = await connection()
  .then((db) => db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) }));

  return recipe;
};

const addImage = async (id, image) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const recipeWithImage = await connection()
  .then((db) => db.collection('recipes').findOneAndUpdate(
    { _id: ObjectId(id) },
    { $set: { image } },
    { returnOriginal: false },
  ));

  return recipeWithImage.value;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteRecipe,
  addImage,
};