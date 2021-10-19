const Book = require('./book.model');
const mongoose = require('mongoose');
async function getAllBooks(req, res) {
  const { query } = req.query;
  try {
    const books = await Book.find({ title: new RegExp(query, 'i') });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getBookById(req, res) {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      res.status(404).send();
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getAllBooks, getBookById };
