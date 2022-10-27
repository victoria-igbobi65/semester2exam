const express = require('express')

const userController = require('../controllers/user')
const userRouter = express.Router()


userRouter
    .route('/signup')
    .post(userController.createUser)


userRouter
    .route('/login')
    .post(userController.login)

module.exports=userRouter
