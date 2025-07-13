'use client';
import { useState, useEffect } from 'react';
import Header from '@/component/Header';

export default function ClientLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    setIsLoggedIn(!!(token && userData));
  }, []);
  
  return (
    <>
      {!isLoggedIn && <Header />}
      {children}
    </>
  );
}