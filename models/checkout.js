const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  checkoutDate: Date,
  returnDate: Date,
  status: { type: String, enum: ['issued', 'returned', 'overdue'], default: 'issued' },
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
