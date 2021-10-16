const fs = require('fs');
const BookModel = require('./resource/book/book.model');
const mongoose = require('mongoose');
const path = require('path');

// 环境变量
const NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({ path: `.env.${NODE_ENV}` });

const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://localhost:27017/bookshelf';

async function connect() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('connect');
  } catch (error) {
    console.log(error);
  }
}

connect().then(async () => {
  fs.readFile(path.resolve(__dirname, 'books.json'), async (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const books = JSON.parse(data.toString());
    const booksWithoutId = books.map(({ id, ...rest }) => rest);
    for (const book of books) {
      try {
        await BookModel.updateOne({ title: book.title }, book, {
          upsert: true,
        });
        console.log('update one');
      } catch (error) {
        console.log(error);
      }
    }
    console.log('done');
    process.exit();
  });
});
