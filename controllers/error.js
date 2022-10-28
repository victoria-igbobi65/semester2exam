require('dotenv').config()

const prodValidationError = err => {
  console.log('Hello')
}

const devHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  res.status(statusCode).json({
    status: status,
    message: err.message,

  });
}

var prodHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {err = prodValidationError(err)}

  if (err.isOperational){
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    })
  }

  else {
    return res.status(500).json({
      status: "error",
      message: "Server Issues!",
    });
  }
}


module.exports = process.env.NODE_ENV === 'development' ? devHandler: prodHandler
