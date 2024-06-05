import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import UserSchema from "@/lib/models/user";
import { Types } from "mongoose";
import User from "@/lib/models/user";
const ObjectId=require('mongodb').ObjectId
import CategorySchema from "@/lib/models/category";
import { futimesSync } from "fs";

export async function POST(req:Request) {
    try {
        const {searchParams}=new URL(req.url)
        const userId=searchParams.get('userId')
        const body=await req.json()
        const { title }=body
        console.log(title)
        if(!title||!userId){
          return NextResponse.json({
            error:"Missing title or userId",
            status:400
          })
        }
        await connectDB()
        const category=await CategorySchema.create({
          title,
          user:new Types.ObjectId(userId)
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

export async function GET(req:Request){
      try {
         const {searchParams}=new URL(req.url)
         const userId=searchParams.get('userId')
         if(!userId){
           return NextResponse.json({
             error:"Missing userId",
             status:400
           })
         }
         const categories=await CategorySchema.find({
          user:new Types.ObjectId(userId)
        })
        return NextResponse.json({
          categories,
          status:200
        })
      } catch (error) {
         return NextResponse.json({
             error:error,
             status:500
         })
      }
}