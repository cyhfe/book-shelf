const express = require('express');
const {
  // readList,
  createListItem,
  // updateItem,
  // deleteItem,
} = require('./list.controller');

const Router = express.Router();

// Router.get('/', readList);
Router.post('/', createListItem);
// Router.put('/', updateItem);
// Router.delete('/', deleteItem);

module.exports = Router;
