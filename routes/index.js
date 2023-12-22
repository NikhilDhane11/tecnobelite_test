const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const bookRoutes = require('./bookRoutes');
const checkoutRoutes = require('./checkoutRoutes');

router.use('/library', userRoutes);
router.use('/library', bookRoutes);
router.use('/library', checkoutRoutes);

module.exports = router;
