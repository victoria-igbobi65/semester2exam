const User = require("../models/user");
const AppError = require("../../utils/appError");
const catchAsync = require('../../utils/catchAsync')
const helpers = require("../../utils/helpers");


exports.createUser = catchAsync( async (req, res, next) => {

  const { first_name, last_name, email, password } = req.body;

  /*Save new user to DB*/
  const newUser = await User.create({
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
  });

  /*Success response*/
  res.status(201).json({ status: true, newUser: newUser });
  
});


exports.login = catchAsync( async (req, res, next) => {

  const { email, password } = req.body;

  /*Find user and check if user*/
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError("Incorrect email or password!", 401));
  }

  /*Generate token for user and send token to user*/
  const token = helpers.signToken(user._id);
  return res.status(200).json({
    status: true,
    token,
  });
  
});