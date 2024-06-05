import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import UserSchema from "@/lib/models/user";
import { Types } from "mongoose";
import User from "@/lib/models/user";
import bcrypt from 'bcryptjs'
import { connect } from 'http2';
const ObjectId=require('mongodb').ObjectId
export async function POST(req:Request){
    try {
        const {email,password}=await req.json()
        if(!email||!password){
            return NextResponse.json({
                error:"Missing email or password",
                status:400
            })
        }
        await connectDB()
        const isEmailExist=await UserSchema.findOne({email})
        if(!isEmailExist){
            return NextResponse.json({
                error:"User does not exist",
                status:400
            })
        }
        const isPasswordCorrect=await bcrypt.compare(password,isEmailExist.password)
        if(!isPasswordCorrect){
            return NextResponse.json({
                error:"Incorrect password",
                status:400
            })
        }
        const payload={
            id:isEmailExist._id,
            email:isEmailExist.email
        }
        const token=await jwt.sign(payload,process.env.JWT_SECRET!)
        const response= NextResponse.json({
            token,
            message:"Login successful",
            status:200
        })
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response
    } catch (error) {
        return NextResponse.json({
            error:error,
            status:500
        })
    }
}