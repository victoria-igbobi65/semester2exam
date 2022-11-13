require('dotenv').config()
const AppError = require('../../utils/appError')

/*Defined error*/
const prodValidationError = err => {
  return new AppError(err.message, 400)
}

/*Defined Error 1*/
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}`
  return new AppError(message, 400)

}

const handleDuplicateFieldsDb = (err) => {

    const value = err.keyValue.title
      ? JSON.stringify(err.keyValue.title)
      : JSON.stringify(err.keyValue.email);
    const message = `Duplicate field value < ${value} >: Please use another value!`;
    return new AppError(message, 400)
};


/*Development error handler*/
const devHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  res.status(statusCode).json({
    status: status,
    message: err.message,

  });
}

/*Production error handler*/
var prodHandler = (err, req, res, next) => {
  console.log(err)

  /*Defined Errors*/
  if (err.name === 'ValidationError') {err = prodValidationError(err)}
  if (err.name === 'CastError') {err = handleCastErrorDB(err)}
  if (err.code === 11000) {err = handleDuplicateFieldsDb(err)};

  /*Response Handler for defined errors*/
  if (err.isOperational){
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  }

  /*Response Handlers for undefined errors*/
  else {
    return res.status(500).json({
      status: "error",
      message: "Server Issues!",
    });
  }
}


module.exports = process.env.NODE_ENV === 'development' ? devHandler: prodHandler
