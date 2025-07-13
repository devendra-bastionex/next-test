"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [userToken, setUserToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  
  const checkAuth = () => {
    setUserToken(localStorage.getItem("token"));
    setUserData(localStorage.getItem("user"));
  };
  
  useEffect(() => {
    setUserToken(localStorage.getItem("token"));
    setUserData(localStorage.getItem("user"));
  }, []);
  
  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Logout API failed:', error);
    }
    
    localStorage.clear();
    setUserToken(null);
    setUserData(null);
    router.push('/login');
  };
  console.log("userToken", userToken, "userData", userData);
  
  return (
    <header>
        <main>
            <div className="header-logo"><Link href="/">Logo</Link></div>
            <ul className="header-menu">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/course">Course</Link></li>
                <li><Link href="/products">Products</Link></li>
                {userToken && userData ?
                  <li><a href="#" onClick={handleLogout} >Logout</a></li>:
                  <li><Link href="/login">Login</Link></li>
                }
            </ul>
        </main>
    </header>
  );
}
