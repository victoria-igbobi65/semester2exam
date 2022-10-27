const Post = require('../models/post')
const AppError = require('../utils/appError')

exports.createPost = async(req, res, next) => {
    try{
        const { title, description, tags, author, body } = req.body;
        const owner = req.user._id;

        const newPost = await Post.create({
          title: title,
          description: description,
          tags: tags,
          author: author,
          body: body,
          owner_id: owner,
        });

        res.status(200).json({
          status: true,
          newPost,
        });
    }
    catch(err){
        return res.status(400).json({
            status: false,
            err: err
        })
    }
}

exports.updatePost = async(req, res, next) => {
    try{
        const { id } = req.params;
        const visitor = req.user._id;

        /*1 Checking if the requested post belongs to the visitor*/
        const post = await Post.findOne({ _id: id, owner_id: visitor });

        /*2 Error message*/
        if (!post) {
        return next(new AppError("Check the post Id and try again!", 400));}

        /*3 Getting data to update*/
        if (req.body.body) {
        post.body = req.body.body;}
        if (req.body.state) {
        post.state = req.body.state;}

        post.save({ validateBeforeSave: true });
        return res.status(200).json({
        status: true,
        post: post})
    }
    catch(err){
        return res.status(500).json({
            status: false,
            err: err
        })
    }

}