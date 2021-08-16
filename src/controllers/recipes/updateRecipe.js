const jwt = require('jsonwebtoken');

const RecipeModel = require('../../models/recipes');

const secret = 'Fenix Iorp';

const SUCCESS_CODE = 200;
const UNAUTHORIZED_CODE = 401;
const JWT_MALFORMED = 'jwt malformed';
const MISSING_TOKEN_MESSAGE = 'missing auth token';

module.exports = async (req, res, _next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(UNAUTHORIZED_CODE).json({ message: MISSING_TOKEN_MESSAGE });
  }

  const decoded = jwt.decode(token, secret);
  if (!decoded) {
    return res.status(UNAUTHORIZED_CODE).json({ message: JWT_MALFORMED });
  }

  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const { _id, userId } = await RecipeModel.getOneRecipe(id);

  const response = await RecipeModel
    .updateRecipe({ _id, name, ingredients, preparation, userId });

  res.status(SUCCESS_CODE).json(response);
};
