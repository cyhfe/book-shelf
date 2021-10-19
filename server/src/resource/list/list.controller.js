const List = require('./list.model');
const mongoose = require('mongoose');

async function createListItem(req, res) {
  const { id } = req.user;
  const { bookId } = req.body;
  try {
    const item = await List.findOneAndUpdate(
      { createdBy: id },
      {
        $addToSet: {
          books: {
            book: bookId,
          },
        },
      }
    ).populate('createdBy');

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getListByUserId(req, res) {
  const user = req.user;
  try {
    const list = await List.findOne({ createdBy: user._id });
    if (!list) {
      return res.status(404).send();
    }
    return res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createListItem };
