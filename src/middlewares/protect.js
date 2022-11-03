const Post = require("../models/post");
const AppError = require("../../utils/appError");

exports.protect = async (req, res, next) => {
  const visitor = req.user._id;
  const { id } = req.params;
  const post = await Post.findById(id);

  /*Check post*/
  if (!post) {
    return next(new AppError(`Post with ID ${id} wasn't found`, 404));
  }

  /*Check if visitor is owner of post*/
  if (post.author.equals(visitor)) {
    req.state = post.state;
    return next();
  }

  /*Unauthorize message*/
  return next(new AppError("unauthorized action!", 401));
};
