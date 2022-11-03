const express = require('express')
const bodyParser = require('body-parser')

const globalErrorHandler = require('./src/controllers/error')
const AppError = require('./utils/appError')
const userRoute = require('./src/routes/user')
const postRoute = require('./src/routes/post')


const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/post', postRoute)
app.use('/user', userRoute);


app.use('*', (req, res, next) =>{
    return next(new AppError(`This URL ${req.originalUrl} can not be found on this server!`, 404))
})
app.use(globalErrorHandler)

module.exports=app