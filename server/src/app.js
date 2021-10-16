const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const { login, logout, register, protect } = require('./auth');
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

const booksRouter = require('./resource/book/book.router');

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../public')));

app.post('/register', register);
app.post('/login', login);
app.post('/logout', logout);

app.use('/api', protect);
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
