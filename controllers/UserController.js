const { AUTH_TOKEN_SALT } = process.env;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Controller는 오직 Service 레이어에만 의존합니다.
const { userService } = require('../services');

const logIn = async (req, res, next) => {
  try {
    const TOKEN_MAINTAINING_HOURS = 24;
    const { email, password: inputPassword } = req.body;

    const foundUser = await userService.findUser({ email }, ['id', 'password']);

    if (!foundUser)
      return res.status(400).json({ message: 'client input invalid' });

    const { id, password: hashedPassword } = foundUser;
    const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword);

    if (!isValidPassword)
      return res.status(400).json({ message: 'client input invalid' });

    const hostId = await userService.verifyHost(id);

    console.log('hostId in UserController', hostId);
    const token = jwt.sign({ id, hostId }, AUTH_TOKEN_SALT, {
      expiresIn: `${TOKEN_MAINTAINING_HOURS}h`,
    });

    res.status(200).json({ message: 'SUCCESS', token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  logIn,
};
