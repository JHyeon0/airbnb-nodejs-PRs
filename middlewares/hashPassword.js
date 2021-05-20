const { errorGenerator } = require('../erros');
const { userService } = require('../services');

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    !password && errorGenerator(400);

    req.body.hashedPassword = await userService.hashPassword(password);

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  hashPassword,
};
