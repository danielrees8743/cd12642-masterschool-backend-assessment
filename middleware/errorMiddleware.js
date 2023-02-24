exports.errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const errMessage = err.message ? err.message : 'Something went wrong';
  const stack = process.env.NODE_ENV === 'production' ? null : err.stack;

  return res.status(statusCode).json({
    errMessage,
    stack,
  });
};
