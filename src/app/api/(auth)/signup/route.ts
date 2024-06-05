import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import UserSchema from "@/lib/models/user";
import { Types } from "mongoose";
import User from "@/lib/models/user";
import bcrypt from 'bcryptjs'
const ObjectId=require('mongodb').ObjectId

export async function POST(req:Request) {
    try {
        const {email,password}=await req.json()
        await connectDB()
        const isUserExist=await UserSchema.findOne({email})
        if(isUserExist){
            return NextResponse.json({
                error:"User already exists",
                status:400
            })
        }
        const hashPassword=await bcrypt.hash(password,10)
        const newUser=await UserSchema.create({
            email,
            password:hashPassword
        })
        return NextResponse.json({
            status:200,
            message:"new user created"
        })
    } catch (error) {
       return NextResponse.json({
        status:500,
        message:error
       })
    }
}