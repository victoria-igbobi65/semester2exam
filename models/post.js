const mongoose = require('mongoose')


const Schema = mongoose.Schema
const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide title!']
    },
    description:{
        type: String,
        required: [true, 'Please provide description!']
    },
    tegs: {
        type: String,
        required: [true, 'Please provide tag!']
    },
    author:{
        type: String,
        required: [true, 'Please provide author!']
    },
    state:{
        type: String,
        enum: ["draft", "published"],
        default: "draft"
    },
    read_count:{
        type: Number,
        default: 0
    },
    reading_time: {
        type: String,
    },
    body:{
        type: String,
        required: [true, 'Please provide body!']
    }
},
{timestamps: true})


const Post = mongoose.model('posts', postSchema)
module.exports=Post