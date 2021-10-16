const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

const booksRouter = require('./resource/book/book.router');

app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/api/books', booksRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

async function start() {
  await mongoose.connect(MONGO_URL);
  console.log('connected to database');
  app.listen(PORT, () => {
    console.log('server running in ' + PORT);
  });
}

start();

module.exports = app;
