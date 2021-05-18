const express = require('express');
const router = express.Router();
const UserRouter = require('./UserRouter');

router.user('/users', UserRouter);

module.exports = router;
