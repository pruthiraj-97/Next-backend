'use client'
import './NavbarCSS.css'
import React from "react";
import Link from "next/link";
function Navbar(){
    return (
       <div className="navbar-div">
        <Link href={'/'}>Home</Link>
        <Link href={'/login'}>Login</Link>
        <Link href={'/signup'}>signup</Link>
        </div>
    )
}

export default Navbar