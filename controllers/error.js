module.exports = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  res.status(statusCode).json({
    status: status,
    message: err.message,

    //stack: err.stack
  });
};