const Post = require('../models/post')
const AppError = require('../../utils/appError')
const catchAsync = require('../../utils/catchAsync')

/*Create Post*/
exports.createPost = catchAsync( async(req, res, next) => {

    const { title, description, tags, body } = req.body;
    const owner = req.user._id;

    /*Post to save*/
    const newPost = await Post.create({
      title: title,
      description: description,
      tags: (tags.trim()).split(/[, ]+/),
      author: owner,
      body: body,
    });

    /*Success response*/
    return res.status(201).json({
        status: true,
        newPost,
    });
    
})

/*Update Post Details*/
exports.updatePost = catchAsync( async(req, res, next) => {

    const { id } = req.params;
    var queryObj = req.body;
    const excludedFields = [
      "state",
      "author",
      "read_count",
      "reading_time",
      "createdAt",
      "updatedAt",
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    const post = await Post.findByIdAndUpdate(
      id,
      { $set: queryObj },
      { new: true, runValidators: true }
    ).populate({ path: "author", select: {first_name: 1, _id: 0}});


    /*Success response*/
    return res.status(200).json({
        status: true,
        post: post,
    });   
    
})

/*Update Post state*/
exports.updateState = catchAsync( async( req, res, next) =>{

    const {id} = req.params
    const state = req.body.state
    var postState = req.state;

    /*Check state of post if its already pudated*/
    if (postState == "published" && state ) {
      return next(new AppError('Post already published!', 400))
    }

    /*Update state*/
    const post = await Post.findByIdAndUpdate(id, { $set: {state: state} }, { new: true, runValidators: true })
                        .populate({path: 'author', select: {first_name: 1, _id: 0}})

    /*Success response*/
    return res.status(200).json({
        status: true,
        post: post
    })
})


/*Delete post*/
exports.deletePost = catchAsync(async(req, res, next) => {

    const { id } = req.params;
    const owner = req.user._id;

    /*Delete post*/
    const post = await Post.deleteOne({ id: id, author: owner });

    /*success response*/
    return res.status(200).json({
      status: true,
      msg: null,
    });
    
})

/*Get all post belonging to a user*/
exports.getAllMyPost = catchAsync(async (req, res, next) => {

    const visitor = req.user._id;
    const queryObj = req.query.state? { author: visitor, state: req.query.state} : {author: visitor}

    /*Getting page and limit*/
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * limit;

    /*All posts by a User*/
    const visitorPosts = await Post
                            .find(queryObj)
                            .skip(skip)
                            .limit(limit);

    /*Success response*/
    return res.status(200).json({
      status: true,
      numberOfPost: visitorPosts.length,
      page: page,
      posts: visitorPosts,
    });
})

/*Get a single blog post*/
exports.getPostById = catchAsync( async (req, res, next) => {
    const {id} = req.params

    const post = await Post.findById(id)
                                .where({state: {$eq: "published"}})
                                .populate({path: "author", select: {__v: 0}})
                                .select({__v: 0})

    /*Check if post was not found*/
    if (!post){
        return next(new AppError(`post with ID ${id} doesn't exist`, 404))
    }

    /*Increment count*/
    post.read_count = post.read_count += 1
    await post.save()

    /*Success response*/
    return res.status(200).json({
        status: true,
        post: post
    });

    
})

/*Get all blog posts*/
exports.getAllPost = catchAsync( async(req, res, next) => {

    //FILTERING
    let queryObj = { ...req.query};
    const excludedFields = ['page', 'sort', 'limit', 'fields', "author"];
    excludedFields.forEach((el) => delete queryObj[el]);

    
    /*Persist user input to lowercase */
    queryObj = Object.fromEntries( Object.entries(queryObj).map(([key, value]) => [key, value.toLowerCase()]))
    const sortBy = req.query.sort? req.query.sort.split(",").join(" "): "-createdAt"

    
    /*Query build up*/
    if (req.query.author){
      queryObj.author = req.query.author;
    }
    if (req.query.tags) {
      queryObj.tags = { $in: [req.query.tags] };
    }
    queryObj.state = { $eq: "published" };
    
  
    /*Pagination*/
    const page = +req.query.page || 1
    const limit = +req.query.limit || 20
    const skip = (page - 1) * limit

    /*Querying posts*/
    const post = await Post
        .find(queryObj)
        .sort(sortBy)
        .skip(skip)
        .limit(limit);

    /*Success response*/
    return res.status(200).json({
        status: true,
        page: page,
        numberOfPosts: post.length,
        posts: post
    })
})