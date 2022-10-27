const Post = require('../models/post')

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