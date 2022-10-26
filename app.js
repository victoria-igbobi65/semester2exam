const express = require('express')
const bodyParser = require('body-parser')

const globalErrorHandler = require('./controllers/error')
const AppError = require('./utils/appError')
const userRoute = require('./routes/user')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', userRoute)


app.use('*', (req, res, next) =>{
    return next(new AppError(`This URL ${req.originalUrl} can not be found on this server!`, 404))
})
app.use(globalErrorHandler)

module.exports=app