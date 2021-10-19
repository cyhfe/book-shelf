const User = require('./user.model');

async function getUserBooks(req, res) {
  const { id } = req.user;
  try {
    const user = await User.findById(id).populate('books');
    if (!user) {
      return res.status(404).send();
    }
    return res.status(200).json(user.books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function addToUserBooks(req, res) {
  const { id } = req.user;
  const { bookId } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { id },
      { $addToSet: { books: bookId } },
      { new: true }
    ).populate('books');
    if (!user) {
      return res.status(404).send();
    }
    return res.status(200).json(user.books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getUserBooks, addToUserBooks };
