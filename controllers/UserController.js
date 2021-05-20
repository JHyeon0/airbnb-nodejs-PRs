// Controller는 오직 Service 레이어에만 의존합니다.
const { userService } = require('../services');
const { errorGenerator } = require('../erros');

const signUp = async (req, res, next) => {
  try {
    const {
      email,
      hashedPassword,
      phoneNumber,
      profileImageUrl,
      introduction,
    } = req.body;

    /*
      middleware에서 email, hashedPassword, phoneNumber의
      존재에 대한 에러 처리 했는데,
      여기서도 또 에러 처리를 해야할까요?
    */

    const createdUser = await userService.createUser({
      email,
      password: hashedPassword,
      phoneNumber,
      profileImageUrl,
      introduction,
    });

    res.status(201).json({
      message: 'user created',
      userId: createdUser.id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUp,
};
