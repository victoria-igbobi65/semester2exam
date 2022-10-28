const Post = require('../models/post')
const AppError = require('../utils/appError')

exports.createPost = async(req, res, next) => {
    try{
        const { title, description, tags, author, body } = req.body;
        const owner = req.user._id;

        /*Post to save*/
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
        const owner = req.user._id;

        /*1 Checking if the requested post belongs to the visitor*/
        const post = await Post.findOne({ _id: id, owner_id: owner });

        /*2 Getting data to update*/
        if (req.body.body) {
            post.body = req.body.body
        }
        if (req.body.state) {
            /*Only change post state if its in draft*/
            if (post.state === 'draft'){
                post.state = req.body.state;
        }}

        await post.save({ validateBeforeSave: true });
        
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

exports.deletePost = async(req, res, next) => {
    try{
        const {id} = req.params
        const owner = req.user._id

        const post = await Post.deleteOne({ id: id, owner_id: owner });

        return res.status(200).json({
            status: true,
            msg: null
        })
    }
    catch(err){
        return res.status(400).json({
            status: false,
            err: err
        })
    }
}

exports.getAllMyPost = async (req, res, next) => {
    try{
        const visitor = req.user._id
        var queryObj = {owner_id: visitor}

        /*Getting page and limit*/
        const page = +req.query.page || 1
        const limit = +req.query.limit || 10
        const skip = (page - 1) * limit

        /*Handling state*/
        if (req.query.state){
            queryObj.state = req.query.state
        }

        /*posts by User*/
        const visitorPosts = await Post
                                    .find(queryObj)
                                    .skip(skip)
                                    .limit(limit)
                                
        /*Success response*/
        return res.status(200).json({
            status: true,
            numberOfPost: visitorPosts.length,
            page: page,
            posts: visitorPosts
        })

    }
    catch(err){
        console.log("hey")
        return res.status(400).json({
            status: false,
            err: err,
        });
    }
}