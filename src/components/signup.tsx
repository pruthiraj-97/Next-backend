'use client'
import React from "react";
import './signupCSS.css'
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
export default function SignupCompo() {
    const router=useRouter()
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error,setError]=useState<string>('')
    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const response=await fetch('/api/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,password
            })
        })
        const data=await response.json()
        console.log(data)
        if(data.status===400){
            setError("This email already exists")
        }else if(data.status==200){
            router.push('/login')
        }
    }
    return (
        <div className="signup-div">
            {error && <p>{error}</p>}
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
}