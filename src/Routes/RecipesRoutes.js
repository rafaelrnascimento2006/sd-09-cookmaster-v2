const rescue = require('express-rescue');
const { createRecipe } = require('../controllers/Recipes');
const { validateToken } = require('../middlewares');

const RecipesRoutes = (app) => {
  app.route('/recipes')
    .post(validateToken, rescue(createRecipe));
};

module.exports = RecipesRoutes;