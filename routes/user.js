const express = require('express')

const userController = require('../controllers/user')
const userRouter = express.Router()


userRouter
    .route('/')
    .post(userController.createUser)


module.exports=userRouter