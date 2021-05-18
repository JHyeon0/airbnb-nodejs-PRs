const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares');

const { userController } = require('../controllers');
// Route 는 오직 Controller 에만 의존 합니다.

router.post('/login', userController.logIn);

module.exports = router;
