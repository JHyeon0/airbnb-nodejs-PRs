const express = require('express');
const router = express.Router();
const ReservationRouter = require('./ReservationRouter');

router.use('/reservations', ReservationRouter);

module.exports = router;
