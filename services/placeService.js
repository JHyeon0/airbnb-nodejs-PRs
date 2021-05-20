const { placeDao } = require('../dao');

const findPlaces = async (fields) => {
  return await placeDao.findPlaces(fields);
};

const findOnePlace = async (placeId, foundUser) => {
  /*
  airbnb에서는 guest와 host가 조회할 수 있는 데이터의 범위가 다릅니다.
  req에 hostId가 있으면 host가 조회하는 것이므로,
  guest가 조회할 때보다 훨씬 더 상세한 데이터가 포함되어 있어야 합니다.
  따라서, user의 권한에 따라 서로 다른 dao 함수를 호출합니다.
  */
  if (foundUser.hostId) {
    return await placeDao.findOnePlaceByHost(placeId);
  } else {
    return await placeDao.findOnePlaceByGuest(placeId);
  }
};

module.exports = {
  findPlaces,
  findOnePlace,
};
