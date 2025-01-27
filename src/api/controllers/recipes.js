const recipes = require('../services/recipes');
const upload = require('../middlewares/upload');

const create = (req, res) => recipes.create(req.body, req.user)
  .then(({ status, recipe }) => res.status(status).json({ recipe }));

const getAll = (_req, res) => recipes.getAll()
  .then(({ status, data }) => res.status(status).json(data));

const getById = (req, res) => recipes.getById(req.params.id)
  .then(({ status, data }) => res.status(status).json(data));

const update = (req, res) => recipes.update(req.params.id, req.body, req.user)
  .then(({ status, userId }) =>
    res.status(status).json({ _id: req.params.id, ...req.body, userId }));

const remove = (req, res) => recipes.remove(req.params.id)
  .then(({ status }) => res.status(status).json());

const putImage = [upload.single('image'),
  (req, res) => recipes.putImage(req.params.id, req.file.path)
    .then(({ status, data }) => res.status(status).json(data))];

module.exports = { create, getAll, getById, update, remove, putImage };
