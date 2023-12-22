const Book = require('../models/book');

const addBook = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ error: 'Permission denied.' });
  }

  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateBook = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ error: 'Permission denied.' });
  }

  const bookId = req.params.bookId;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ error: 'Book not found.' });
    }

    Object.assign(book, req.body);
    await book.save();

    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
};

const partialUpdateBook = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ error: 'Permission denied.' });
  }

  const bookId = req.params.bookId;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ error: 'Book not found.' });
    }

    for (const [key, value] of Object.entries(req.body)) {
      book[key] = value;
    }

    await book.save();

    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { addBook, updateBook, partialUpdateBook };
