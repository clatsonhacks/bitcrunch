"use client";
import { ConnectButton, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { config } from "./wagmi"; // Ensure correct import
import "@rainbow-me/rainbowkit/styles.css";
import "./page.css";

const client = new QueryClient();

const HomeContent = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected && address) {
      localStorage.setItem("walletAddress", address); // Save wallet address
      router.push("/"); // Redirect to dashboard
    }
  }, [isConnected, address, router]);

  return (
    <main  className="h-full flex flex-col justify-center items-center py-80 bg-[url(/background/bg-img.png)]">
      <ConnectButton />
      {isConnected && <p>Wallet Address: {address}</p>} {/* Show address */}
    </main>
  );
};

const Home = () => {
  return (
    <div>
      <Head>
        <title>Connect Wallet</title>
        <meta name="description" content="Wallet connection using RainbowKit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider>
            <HomeContent /> {/* Wrapped inside the provider */}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </div>
  );
};

export default Home;
