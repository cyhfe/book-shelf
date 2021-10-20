const express = require('express');
const {
  getList,
  addToListItem,
  modifyListItem,
  removeFromListItem,
} = require('./list.controller');

const Router = express.Router();

Router.get('/', getList);
Router.post('/', addToListItem);
Router.patch('/', modifyListItem);
Router.delete('/', removeFromListItem);

module.exports = Router;
