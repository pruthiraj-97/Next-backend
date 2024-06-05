import mongoose from "mongoose";
export async function connectDB(){
    try {
        const connectionState=mongoose.connection.readyState
        if(connectionState==1){
            console.log("Already connected");
            return ;
        }
        await mongoose.connect(process.env.MONGODB_URI!)
        console.log("db connected")
    } catch (error:any) {
        console.log("error in db connect",error)
        throw new Error(error)
    }
}