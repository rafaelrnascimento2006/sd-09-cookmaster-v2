const middlewareError = (error, req, res, _next) => {
  console.log('entrei no midd');
  if (error.message) {
    return res.status(401).json({ message: error.message });
  }
  return res.status(error.status).json({ message: error.msg });
};

module.exports = middlewareError;