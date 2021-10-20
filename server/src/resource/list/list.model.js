const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    index: { unique: true },
  },
  books: [
    {
      book: {
        type: mongoose.Types.ObjectId,
        ref: 'Book',
        required: true,
      },
      notes: String,
      status: {
        type: String,
        enum: ['FINISHED', 'READING'],
        required: true,
        default: 'READING',
      },
    },
  ],
});

module.exports = mongoose.model('List', listSchema);
