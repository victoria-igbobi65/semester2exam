const mongoose = require('mongoose')


const Schema = mongoose.Schema
const postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide title!'],
        unique: [true, 'Title must be unique!'],
        lowercase: true
    },
    description:{
        type: String,
        required: [true, 'Please provide description!'],
        lowercase: true
    },
    tags: [{
        type: String,
        required: [true, 'Please provide tag!'],
        lowercase: true
    }],
    author:{
        type: String,
        required: [true, 'Please provide author!'],
        lowercase: true
    },
    state:{
        type: String,
        enum: ["draft", "published"],
        lowercase: true,
        default: "draft"
    },
    read_count:{
        type: Number,
        default: 0
    },
    reading_time: {
        type: Number,
    },
    body:{
        type: String,
        required: [true, 'Please provide body!']
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
},
{timestamps: true})


postSchema.pre('save', async function(next){
    /*calculate read time*/
    const readTime = Math.round(this.body.split(' ').length / 200)
    this.reading_time= readTime < 1? readTime + 1: {readTime}
    next()
})


const Post = mongoose.model('posts', postSchema)
module.exports=Post