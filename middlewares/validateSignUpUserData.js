const { errorGenerator } = require('../erros');
const { userService } = require('../services');

const validateSignUpUserData = async (req, res, next) => {
  try {
    const { email, password, phoneNumber, profileImageUrl, introduction } =
      req.body;

    const REQUIRED_INFO = { email, password, phoneNumber };

    for (const info in REQUIRED_INFO) {
      !REQUIRED_INFO[info] && errorGenerator(400, `MISSING ${info}`);
    }

    !userService.validateEmail(email) && errorGenerator(400, 'INVALID EMAIL');

    const foundUser = await userService.findUser({ email });
    foundUser && errorGenerator(409);

    !userService.validatePw(password) &&
      errorGenerator(400, 'INVALID PASSWORD');

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateSignUpUserData,
};
