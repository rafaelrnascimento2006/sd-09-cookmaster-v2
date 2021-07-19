const connection = require('../api/connection');

const addRecipe = async (name, ingredients, preparation) =>
    connection()
        .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation }))
        .then((result) => result.ops[0]);

module.exports = {
    addRecipe,
};