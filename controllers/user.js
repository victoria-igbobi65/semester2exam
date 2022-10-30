const User = require("../models/user");
const AppError = require("../utils/appError");
const helpers = require("../utils/helpers");


exports.createUser = async (req, res, next) => {
  try {
    console.log(req.body)
    const { first_name, last_name, email, password } = req.body;

    const newUser = await User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    });

    res.status(200).json({ status: true, newUser: newUser });
  } catch (err) {
    res.status(500).json({
      status: false,
      err: err,
    });
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

      /*Find user*/
    const user = await User.findOne({ email }).select("+password")

      /*check if user is not found or password incorrect*/
    if (!user || !(await user.correctPassword(password))) {
      return next(new AppError("Incorrect email or password!", 401));
    }

    /*Generate token for user*/
    const token = helpers.signToken(user._id);

    return res.status(200).json({
      status: true,
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      err: err,
    });
  }
};