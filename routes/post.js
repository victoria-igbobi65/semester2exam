const express = require('express')
const passport = require('passport')

const postController = require('../controllers/post')
const postRouter = express.Router()
const auth = require('../controllers/auth')
require('../controllers/auth')/*Auth middleware*/

postRouter
    .route('/')
    .post(passport.authenticate("jwt", {session: false}), postController.createPost)
    .get(postController.getAllPost)

postRouter
    .route("/:id")
    .patch(passport.authenticate("jwt", { session: false }), auth.protect, postController.updatePost)
    .delete(passport.authenticate("jwt", { session: false }),auth.protect, postController.deletePost)
    .get(postController.getPostById)
  
postRouter
    .route("/me")
    .get(passport.authenticate("jwt", { session: false }), postController.getAllMyPost);


module.exports=postRouter