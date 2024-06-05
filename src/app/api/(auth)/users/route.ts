import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import UserSchema from "@/lib/models/user";
import { Types } from "mongoose";
import User from "@/lib/models/user";
const ObjectId=require('mongodb').ObjectId
export async function GET(req:NextRequest){
   try {
     await connectDB();
     const user=await UserSchema.find()
     return NextResponse.json({
       user,
       status:200
     })
   } catch (error) {
     return NextResponse.json({
       error:"Something went wrong",
     })
   }
}

export async function POST(req:Request){
    try {
        await connectDB()
        const body=await req.json()
        const newUser=await UserSchema.create({
            username:body.username,
            email:body.email,
            password:body.password
        })

        return  NextResponse.json({
            newUser,
            status:200
          })
    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        })
    }
}

export async function PATCH(req:Request){
        try {
            await connectDB()
            const body=await req.json()
            const {id,password}=body
            if(!id || !password){
                return NextResponse.json({
                    error:"Missing id or password",
                    status:400
                })
            }
            if(!Types.ObjectId.isValid(id)){
                return NextResponse.json({
                    error:"Invalid id",
                    status:400
                })
            }
            const updatedUser=await UserSchema.findOneAndUpdate({
                _id:id,
            },{
                $set:{
                    password:password
                }
            }
            ,{new:true})
            if(!updatedUser){
                return NextResponse.json({
                    error:"User not found",
                    status:400
                })
            }
            return NextResponse.json({
                user:updatedUser,
                status:200
            })
        } catch (error:any) {
            return NextResponse.json({
                error:error,
                status:500
            })
        }
}

export async function DELETE(req:Request){
    try {
        await connectDB()
        const {searchParams}=new URL(req.url) // how to handle query
        const id=searchParams.get("id")
        if(!id){
            return NextResponse.json({
                error:"Missing id",
                status:400
            })
        }
        const deletedUser=await UserSchema.findByIdAndDelete(new Types.ObjectId(id))
        if(!deletedUser){
            return NextResponse.json({
                error:"User not found",
                status:400
            })
        }
        return NextResponse.json({
            user:deletedUser,
            status:200
        })  
    } catch (error:any) {
        return NextResponse.json({
            error:`Something went wrong,${error}`,
            status:500
        })
    }
}