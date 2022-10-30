const Post = require('../models/post')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

/*Create Post*/
exports.createPost = catchAsync( async(req, res, next) => {


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

    res.status(201).json({
        status: true,
        newPost,
    });
    
})

/*Update Post Details*/
exports.updatePost = catchAsync( async(req, res, next) => {
    const { id } = req.params;
    var query = req.body;

    /*Delete state from query*/
    if (req.body.state){
        delete query.state
    }

    const post = await Post.findByIdAndUpdate(id, { $set: query }, { new: true, runValidators: true });

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

    /*Check state of post*/
    if (postState == "published" && state ) {
      return next(new AppError('Invalid Operation!', 400))
    }

    /*Update state*/
    const post = await Post.findByIdAndUpdate(id, { $set: {state: state} }, { new: true, runValidators: true });

    return res.status(200).json({
        status: true,
        post: post
    })
})


/*Delete post*/
exports.deletePost = catchAsync(async(req, res, next) => {

    const { id } = req.params;
    const owner = req.user._id;

    const post = await Post.deleteOne({ id: id, owner_id: owner });

    return res.status(200).json({
      status: true,
      msg: null,
    });
    
})

/*Get all post belonging to a user*/
exports.getAllMyPost = catchAsync(async (req, res, next) => {
    const visitor = req.user._id;
    var queryObj = { owner_id: visitor };

    /*Getting page and limit*/
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const skip = (page - 1) * limit;

    /*Handling state*/
    if (req.query.state) {
      queryObj.state = req.query.state;
    }

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
                                .populate({path: "owner_id", select: {__v: 0}})
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
    let queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    /*Persist user input to lowercase */
    queryObj = Object.fromEntries( Object.entries(queryObj).map(([key, value]) => [key, value.toLowerCase()]))

    /*Sorting document*/
    const sortBy = req.query.sort? req.query.sort.split(",").join(" "): "-createdAt"
    
    /*Pagination*/
    const page = +req.query.page || 1
    const limit = +req.query.limit || 20
    const skip = (page - 1) * limit

    /*Querying posts*/
    const post = await Post
                        .find(queryObj)
                        .sort(sortBy)
                        .skip(skip)
                        .limit(limit)

    /*Success response*/
    return res.status(200).json({
        status: true,
        page: page,
        numberOfPosts: post.length,
        posts: post
    })
})