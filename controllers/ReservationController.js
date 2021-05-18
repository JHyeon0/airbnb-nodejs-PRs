// Controller 는 오직 Service 레이어에만 의존합니다.
const { ReservationService } = require('../services');

const getHostReservations = async (req, res, next) => {
  try {
    console.log(req.foundUser.hostId);
    const hostReservations = await ReservationService.getHostReservations(
      req.foundUser.hostId,
    );

    res.status(200).json({ message: 'SUCCESS', hostReservations });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getHostReservations,
};
