const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true,
        min:6
    },
    shortDesc:{
        type:String,
        required:true,
        min:6
    },
    markdown:{
        type:String,
        required:true,
        min:6
    },
    postType:{
        type:String,
        required:true,
        min:1
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('Post',postSchema)