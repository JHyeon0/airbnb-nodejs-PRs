const express = require('express');
const router = express.Router();
const middleware = require('../middlewares');
const { userController } = require('../controllers');
// Route 는 오직 Controller 에만 의존 합니다.

router.post(
  '/signup',
  [middleware.validateSignUpUserData, middleware.hashPassword],
  userController.signUp,
);

module.exports = router;
