const express = require('express');
const router = express.Router();

const { reservationController } = require('../controllers');
const { validateHost } = require('../middlewares');
// Route 는 오직 Controller 에만 의존 합니다.

router.get('/host', [validateHost], reservationController.getHostReservations);

module.exports = router; // 이렇게 내보내면 부모 router 에 자동으로 연결됩니다.
