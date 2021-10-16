const express = require('express');
const { getAllBooks, getBookByName } = require('./book.controller');

const Router = express.Router();

Router.get('/', getAllBooks);

module.exports = Router;
