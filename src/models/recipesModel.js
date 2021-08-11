const { ObjectId } = require('mongodb');
const connection = require('./connections');

const registerRecipeModels = async ({ name, ingredients, preparation }, userId) => {
  const newRecipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));
  const { insertedId: _id } = newRecipe;
  return { recipe: { name, ingredients, preparation, userId, _id } };
};

const getRecipesModels = async () => {
  const result = await connection().then((db) =>
    db.collection('recipes').find().toArray());
  return result;
};

const getByIdRecipeModels = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connection().then((db) => db
    .collection('recipes').findOne({ _id: ObjectId(id) }));
  return result;
};

const editRecipeModels = async (id, { name, ingredients, preparation }) => {
  const recipeId = new ObjectId(id);
  const result = await connection().then((db) => db
    .collection('recipes').findOneAndUpdate({ _id: recipeId },
      { $set: { name, ingredients, preparation } },
      { returnOriginal: false })).then((res) => res.value);
  
  return result;
};

const delRecipeModels = async (id) => {
  const recipeId = new ObjectId(id);
  const result = await connection().then((db) => db
    .collection('recipes').findOneAndDelete({ _id: recipeId }));
  return result;
};

const addImageModels = async (id, image) => {
  const recipeId = new ObjectId(id);
  const result = await connection().then((db) => db
    .collection('recipes').findOneAndUpdate({ _id: recipeId }, { $set: { image } },
      { returnOriginal: false })).then((res) => res.value);
  return result;
};
  
module.exports = {
  registerRecipeModels,
  getRecipesModels,
  getByIdRecipeModels,
  editRecipeModels,
  delRecipeModels,
  addImageModels,
};
