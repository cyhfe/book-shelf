const express = require('express');
const { getUserBooks, addToUserBooks } = require('./user.controller');

const Router = express.Router();

Router.get('/books', getUserBooks);
Router.post('/books', addToUserBooks);

module.exports = Router;
