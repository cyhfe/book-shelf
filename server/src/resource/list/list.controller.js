const List = require('./list.model');
const mongoose = require('mongoose');

async function addToListItem(req, res) {
  const { id } = req.user;
  const { bookId } = req.body;
  try {
    const book = await List.findOne({
      createdBy: id,
      'books.book': bookId,
    });
    if (book) {
      return res.status(409).json({ message: 'this book has existed' });
    }
    const item = await List.findOneAndUpdate(
      {
        createdBy: id,
      },
      {
        $push: {
          books: {
            book: bookId,
          },
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function removeFromListItem(req, res) {
  const { id } = req.user;
  const { bookId } = req.body;
  try {
    const item = await List.findOneAndUpdate(
      {
        createdBy: id,
      },
      {
        $pull: {
          books: {
            book: bookId,
          },
        },
      }
    );
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
async function getList(req, res) {
  const { id } = req.user;
  try {
    const list = await List.findOne({
      createdBy: id,
    });

    if (!list) {
      res.status(404).send();
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function modifyListItem(req, res) {
  const { id } = req.user;
  const { bookId, status, notes } = req.body;
  try {
    const list = await List.findOneAndUpdate(
      {
        createdBy: id,
        'books.book': bookId,
      },
      {
        $set: {
          'books.$.status': status,
          'books.$.notes': notes,
        },
      },
      { new: true }
    );

    if (!list) {
      res.status(404).send();
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { addToListItem, getList, modifyListItem, removeFromListItem };
