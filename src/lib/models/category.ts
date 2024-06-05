import mongoose from "mongoose";
const Category=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    }
})

const CaregotySchema=mongoose.models.Category || mongoose.model('Category',Category)

export default CaregotySchema