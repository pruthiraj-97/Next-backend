import mongoose from "mongoose";
const BlogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        require:true
    }
})

const Blog=mongoose.models.Blog || mongoose.model('Blog',BlogSchema)

export default Blog