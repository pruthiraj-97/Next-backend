'use client'
import React from "react";
import { useState,useEffect } from "react";
import './signupCSS.css'
import { useRouter } from "next/navigation";
export default function LoginCompo() {
    const router=useRouter()
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
        const response=await fetch('/api/login', {
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
        if(data.status==200){
            router.push('/')
        }
    }
    return (
        <div className="signup-div" style={{ maxWidth: '400px', margin: 'auto', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', border: '1px solid rgb(255, 0, 0)', marginTop: '30px' }}>
        <h2>Login</h2>
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
          <button type="submit">Login</button>
        </form>
      </div>
    );
}