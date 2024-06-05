import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import UserSchema from "@/lib/models/user";
import { Types } from "mongoose";
import User from "@/lib/models/user";
const ObjectId=require('mongodb').ObjectId
import CategorySchema from "@/lib/models/category";
import BlogSchema from "@/lib/models/blog";

export async function GET(req:Request,context:{params:any}){
    try {
        const blog=context.params.blog
        if(!blog){
            return NextResponse.json({
                error:"Missing blog",
                status:400
            })
        }
      const Blog=await BlogSchema.findOne({
        _id:new Types.ObjectId(blog)
      })
      return NextResponse.json({
        Blog,
        status:200
      })
    } catch (error) {
        return NextResponse.json({
            error:error,
            status:500
        })
    }
}
export async function DELETE(req:Request,context:{params:any}){
    try {
        const blog=context.params.blog
        if(!blog){
            return NextResponse.json({
                error:"Missing blog",
                status:400
            })
        }
        await connectDB()
        const deletedBlog=await BlogSchema.findByIdAndDelete(blog)
        return NextResponse.json({
            blog:deletedBlog,
            status:200
        })
    } catch (error:any) {
        return NextResponse.json({
            error:error,
            status:500
        })
    }
}