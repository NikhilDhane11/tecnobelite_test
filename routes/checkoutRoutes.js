const express = require('express');
const router = express.Router();
const CheckoutController = require('../controllers/CheckoutController');
const authenticateUser = require('../middleware/authenticateUser');

router.post('/book', authenticateUser, CheckoutController.addBook);
router.put('/:bookId', authenticateUser, CheckoutController.updateBook);
router.patch('/:bookId', authenticateUser, CheckoutController.partialUpdateBook);

module.exports = router;
