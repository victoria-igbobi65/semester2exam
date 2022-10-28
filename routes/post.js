const express = require('express')
const passport = require('passport')

const postController = require('../controllers/post')
const postRouter = express.Router()
require('../utils/auth')/*Auth middleware*/

postRouter
    .route('/')
    .post(passport.authenticate("jwt", {session: false}), postController.createPost)

postRouter
    .route("/:id")
    .post(passport.authenticate("jwt", { session: false }), postController.updatePost)
    .delete(passport.authenticate("jwt", { session: false }), postController.deletePost);
  

postRouter
  .route("/me")
  .get(
    passport.authenticate("jwt", { session: false }), postController.getAllMyPost
  );


module.exports=postRouter