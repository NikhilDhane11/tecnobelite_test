const express = require('express');
const router = express.Router();
const BookController = require('../controllers/BookController');
const authenticateUser = require('../middleware/authenticateUser');

router.get('/books', authenticateUser, BookController.getAllBooks);
router.get('/books/:bookId', authenticateUser, BookController.getBookById);
router.post('/checkout/:bookId', authenticateUser, BookController.checkoutBook);
router.post('/checkout/return-book/:bookId', authenticateUser, BookController.returnBook);

module.exports = router;
