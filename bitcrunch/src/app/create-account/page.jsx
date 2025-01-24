import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';

function page() {
 
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100 ' style={{ backgroundImage: 'url("/background/What if home page.png")', backgroundAttachment:'fixed' }}>
        <ConnectButton />
    </div>
  )
}

export default page