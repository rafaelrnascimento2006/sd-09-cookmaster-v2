const { ObjectId } = require('mongodb');
const connection = require('./connections');

const newRecipeModel = async (recipe) => connection()
  .then((db) => db.collection('recipes').insertOne(recipe))
  .then((result) => result.ops[0]);

const getAllRecipesModel = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getRecipeByIdModel = async (id) => connection()
  .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
  
const updateRecipeByIdModel = async (recipeUpdate) => connection()
  .then((db) => db.collection('recipes')
    .findOneAndUpdate(
      { _id: ObjectId(recipeUpdate.id) },
      {
        $set: {
          name: recipeUpdate.name,
          ingredients: recipeUpdate.ingredients,
          preparation: recipeUpdate.preparation,
          userId: recipeUpdate.userId,
        },
      },
      { returnOriginal: false },
  ))
  .then((result) => result.value);

module.exports = {
  newRecipeModel,
  getAllRecipesModel,
  getRecipeByIdModel,
  updateRecipeByIdModel,
};