import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Head from 'next/head';
function Index() {
  return (
    <div>
        <Head>
        <title>Connect Wallet</title>
        <meta name="description" content="Wallet connection using RainbowKit" />
      </Head>

      <main >
        <ConnectButton />
      </main>

    </div>
  )
}

export default Index