// Controller 는 오직 Service 레이어에만 의존합니다.
const { errorGenerator } = require('../erros');
const { placeService } = require('../services');

const findPlaces = async (req, res, next) => {
  try {
    const fields = req.body;
    const places = await placeService.findPlaces(fields);

    const placeList = places.map((place) => {
      const {
        id,
        title,
        pricePerDay,
        beds,
        bathrooms,
        conveniences,
        maximumGuests,
        host,
        placeType,
        placeImage,
        _count,
      } = place;
      return {
        host: place.host.user.username,
        id,
        title,
        pricePerDay,
        beds,
        bathrooms,
        conveniences,
        maximumGuests,
        placeImage,
        host: host.user.username,
        placeTypeName: placeType.name,
        numberOfReview: _count.review,
      };
    });

    return res.status(200).json({ placeList });
  } catch (err) {
    next(err);
  }
};

const findOnePlace = async (req, res, next) => {
  try {
    const placeId = Number(req.params.placeId);
    const foundUser = req.foundUser;

    if (isNaN(placeId)) {
      errorGenerator(400, 'PLACE_ID_MUST_BE_A_VALID_NUMBER');
    }

    const place = await placeService.findOnePlace(placeId, foundUser);

    if (!place) {
      errorGenerator(404);
    }

    const placeInformation = { ...place, host: place.host.user.username };

    return res.status(200).json({ placeInformation });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  findPlaces,
  findOnePlace,
};
