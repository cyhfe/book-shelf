const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  coverImageUrl: {
    type: String,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
  synopsis: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Book', bookSchema);
