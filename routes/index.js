const express = require('express');
const router = express.Router();

const placeRouter = require('./placeRouter');

router.use('/places', placeRouter);

module.exports = router;
