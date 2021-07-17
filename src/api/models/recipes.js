const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = (recipe, userId) => connection().then((db) =>
  db.collection('recipes').insertOne({ ...recipe, userId })
  .then(({ ops }) => ops[0]));

const getAll = () => connection().then((db) =>
  db.collection('recipes').find().toArray());

const getById = (id) => connection().then((db) =>
  db.collection('recipes').findOne(ObjectID(id)));

const update = (id, recipe, userId) => connection().then((db) =>
  db.collection('recipes').updateOne({ _id: ObjectID(id) },
    { $set: { ...recipe, userId } }));

const remove = (id) => connection().then((db) =>
  db.collection('recipes').deleteOne({ _id: ObjectID(id) }));

module.exports = { create, getAll, getById, update, remove };
