const express = require('express')
const passport = require('passport')

const postRouter = express.Router()
require('../utils/auth')/*Auth middleware*/

postRouter
    .route('/')
    .get()


module.exports=postRouter