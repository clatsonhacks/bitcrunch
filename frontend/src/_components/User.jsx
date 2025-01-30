"use client"
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

function User() {
    const router = useRouter();
    const userAddress = localStorage.getItem('walletAddress');

    useEffect(() => {
      if (!userAddress) {
        router.push('/create-account');
      }
    }, [router]); 
  
    const logout = () => {
      // Remove wallet address from localStorage
      localStorage.removeItem('walletAddress');
      // Redirect to create-account page
      router.push('/create-account');
    };
  return (
        <div className="right-4 dropdown">
  <div tabIndex={0} role="button" className="btn m-1">Profile</div>
  <ul tabIndex={0} className="dropdown-content menu bg-blackrounded-box z-[1] w-5 p-0 shadow">
        <li>{userAddress && <span>{userAddress.slice(0,6)}</span>}
        </li></ul>
</div>
       
  )
}

export default User