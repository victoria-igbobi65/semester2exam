const express = require('express')
const passport = require('passport')

const postController = require('../controllers/post')
const postRouter = express.Router()
require('../utils/auth')/*Auth middleware*/

postRouter
    .route('/')
    .post(passport.authenticate("jwt", {session: false}), postController.createPost)
    


module.exports=postRouter