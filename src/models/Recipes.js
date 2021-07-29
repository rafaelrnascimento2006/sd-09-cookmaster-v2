const connection = require('./connection');

const createRecipe = async (name, preparation, ingredients, userId) => 
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, preparation, ingredients, userId }))
    .then((result) => result.ops[0]);

module.exports = {
  createRecipe,
};