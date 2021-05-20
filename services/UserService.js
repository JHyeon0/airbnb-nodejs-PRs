const bcrypt = require('bcrypt');
const { userDao } = require('../dao');

const validateEmail = (email) => {
  const validEmailRegExp = /\w@\w+\.\w/i;
  return validEmailRegExp.test(email);
};

const validatePw = (pw) => {
  const pwValidation = {
    regexUppercase: /[A-Z]/g,
    regexLowercase: /[a-z]/g,
    regexSpecialCharacter: /[!|@|#|$|%|^|&|*]/g,
    regexDigit: /[0-9]/g,
  };
  const MIN_PW_LENGTH = 8;
  const pwLength = pw.length;

  if (pwLength < MIN_PW_LENGTH) return false;

  for (const validType in pwValidation) {
    if (!pwValidation[validType].test(pw)) {
      return false;
    }
  }

  return true;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const findUser = async (fields) => {
  return await userDao.findUser(fields);
};

const createUser = async (userData) => {
  return await userDao.createUser(userData);
};

module.exports = {
  validateEmail,
  validatePw,
  hashPassword,
  findUser,
  createUser,
};
