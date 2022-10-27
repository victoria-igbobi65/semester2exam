const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')


const Schema = mongoose.Schema
const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'Please provide your first name!']
    },
    last_name: {
        type: String,
        required: [true, 'Please provide last name']
    },
    email: {
        type: String,
        required: [true, 'Email address is required!'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid email!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minlength: [8, 'Password must not be less than 8 characters!']
    }
})


//A DOCUMENT MIDDLEWARE THAT HASHES USER'S PASSWORD
userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


// A MIDDLEWARE TO CHECK PASSWORD
userSchema.methods.correctPassword = async function (password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);

    return compare;
};


const User = mongoose.model('users', userSchema)
module.exports=User
