const express = require('express');
const { getAllBooks, getBookById } = require('./book.controller');

const Router = express.Router();

Router.get('/', getAllBooks);
Router.get('/:id', getBookById);

module.exports = Router;
