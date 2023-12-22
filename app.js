const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');
const cron = require('node-cron');
const Checkout = require('./models/checkout');
require('dotenv').config();


app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/tecnobelite_db', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use('/', routes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


cron.schedule('0 0 * * *', async () => {
  try {
    const overdueCheckouts = await Checkout.find({ status: 'issued', returnDate: { $lt: new Date() } });
    overdueCheckouts.forEach(async (checkout) => {
      checkout.status = 'overdue';
      checkout.userId.lateReturnFine += 10;
      await checkout.userId.save();
      await checkout.save();
    });
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});

