import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import UserSchema from "@/lib/models/user";
import { Types } from "mongoose";
import User from "@/lib/models/user";
const ObjectId=require('mongodb').ObjectId
import CategorySchema from "@/lib/models/category";
import BlogSchema from "@/lib/models/blog";

export async function POST(req:Request) {
   try {
     const {searchParams}=new URL(req.url)
     const userId=searchParams.get('userId')
     const categoryId=searchParams.get('categoryId')
     if(!userId||!categoryId){
        return NextResponse.json({
          error:"Missing userId or categoryId",
          status:400
        })
     }
     const body=await req.json();
     const {title,content}=body
     if(!title||!content){
       return NextResponse.json({
         error:"Missing title or content",
         status:400
       })
     }
     await connectDB()
     const newBlog=await BlogSchema.create({
       title,
       content,
       user:new Types.ObjectId(userId),
       category:new Types.ObjectId(categoryId)
     })

     return NextResponse.json({
       blog:newBlog,
       status:200
     })

   } catch (error:any) {
      return NextResponse.json({
        error:error,
        status:500
      })
   }
}
