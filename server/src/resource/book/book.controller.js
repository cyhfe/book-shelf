const Book = require('./book.model');
async function getAllBooks(req, res) {
  const { query } = req.query;
  try {
    const books = await Book.find({ title: new RegExp(query, 'i') });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

function getBookByName() {}

module.exports = { getAllBooks, getBookByName };
