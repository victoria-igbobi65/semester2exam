const User = require('../models/user')

exports.createUser = async (req, res, next) =>{
    try{
        const { first_name, last_name, email, password } = req.body;

        const newUser = await User.create({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
        });

        res.status(200).json({ status: true, newUser: newUser})
    }
    catch(err){
        res.status(500).json({
            status: false,
            err: err
        })
    }
}