const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;


const Post = require('../models/post')
const User = require('../models/user')
const AppError = require('../utils/appError')
require("dotenv").config();


var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET


passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    
    User.findById(jwt_payload.id , function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

exports.protect = async (req, res, next) => {
  const visitor = req.user._id
  const {id} = req.params
  const post = await Post.findById(id)

  /*Check post*/
  if (!post){
    return next(new AppError(`Post with ID ${id} wasn't found`, 404))
  }
  
  /*Check if visitor is owner of post*/
  if (post.author.equals(visitor)){
    req.state = post.state
    return next()
  }

  /*Unauthorize message*/
  return next(new AppError('unauthorized action!', 401))

}