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
        validate: [validator.isEmail, 'Invalid email!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        lowercase: true,
        minlength: [8, 'Password must not be less than 8 characters!']
    }
})


//A DOCUMENT MIDDLEWARE THAT HASHES USER'S PASSWORD
userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 12)

    next()
})



const User = mongoose.model('user', userSchema)
module.exports=User
