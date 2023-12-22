const Book = require('../models/book');
const Checkout = require('../models/checkout');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getBookById = async (req, res) => {
  const bookId = req.params.bookId;

  try {
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).send({ error: 'Book not found.' });
    }

    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
};

const checkoutBook = async (req, res) => {
  const bookId = req.params.bookId;
  const userId = req.user._id;

  const someDate = new Date();
  const numberOfDaysToAdd = 10;
  const result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
  const returnDate = new Date(result);

  try {
    const book = await Book.findById(bookId);
    if (!book || book.availableCopies <= 0) {
      return res.status(400).send({ error: 'Book not available for checkout.' });
    }

    const checkout = new Checkout({ bookId, userId, checkoutDate: someDate, returnDate: returnDate, status: 'issued' });
    await checkout.save();

    book.availableCopies -= 1;
    await book.save();

    res.status(201).send(checkout);
  } catch (error) {
    res.status(500).send(error);
  }
};

const returnBook = async (req, res) => {
  const bookId = req.params.bookId;
  const userId = req.user._id;

  try {
    const checkout = await Checkout.findOne({ bookId, userId, status: 'issued' });
    if (!checkout) {
      return res.status(400).send({ error: 'Book not checked out by the user.' });
    }

    checkout.returnDate = new Date();
    checkout.status = 'returned';
    await checkout.save();

    const book = await Book.findById(bookId);
    book.availableCopies += 1;
    await book.save();

    res.send(checkout);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAllBooks, getBookById, checkoutBook, returnBook };
