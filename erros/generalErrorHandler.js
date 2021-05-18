const generalErrorHandler = (err, req, res, next) => {
  const { status, message } = err;
  console.error(err);
  res.status(status || 500).json({ message });
};

module.exports = generalErrorHandler;
