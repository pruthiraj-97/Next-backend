'use client'
import React from "react";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
function Compo() {
    const router=useRouter()
    const [count,setCount]=useState<number>(0)
    useEffect(()=>{
        setCount(10)
    },[])
    return (
        <>
        <p>{count}</p>
        <button onClick={()=>{
            setCount(count+1)
        }}>increment</button>
        <button onClick={()=>{
            setCount(count-1)
        }}>decrement</button>
        <button onClick={()=>{
            setCount(0)
        }}>reset</button>
        <button onClick={()=>router.push("/")}>go to home</button>
        </>
    )
}
export default Compo