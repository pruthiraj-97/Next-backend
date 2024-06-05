import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import UserSchema from "@/lib/models/user";
import { Types } from "mongoose";
import User from "@/lib/models/user";
const ObjectId=require('mongodb').ObjectId
import CategorySchema from "@/lib/models/category";

export async function GET(req:Request,context:{params:any}){
    try {
        const id=context.params.id
        console.log(id)
        if(!id){
            return NextResponse.json({
                error:"Missing id",
                status:400
            })
        }
        const category=await CategorySchema.findOne({_id: new Types.ObjectId(id)})
                                           .populate({
                                            path:'user',
                                            select:'name email '
                                           })
        return NextResponse.json({
            category,
            status:200
        })
    } catch (error) {
        return NextResponse.json({
            error:error,
            status:500
        })
    }
}
