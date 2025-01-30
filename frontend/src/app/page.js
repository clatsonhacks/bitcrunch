import React from 'react';
import { Search, Send, Wallet, ChevronDown, LineChart, BarChart3, TextSelection as Collection, Image as ImageIcon } from 'lucide-react';
import Menu from '@/_components/Menu';
import Globalapi from '@/_utils/Globalapi';
import NFTDropdown from '@/_components/NFTDropdown';
import LineGraph from '@/_components/LineGraph';
import ChatBot from '@/_components/ChatBot';
import User from '@/_components/User';
import WhatIfGraph from '@/_components/WhatIfGraph';

async function App() {
  
  const nftCollections = await Globalapi.getNFTCollections();
  const addNFTS = await Globalapi.addNFTS();
 const myCollections = await Globalapi.myCollections();
 const address = await Globalapi.getAddress();
 const predictiveGraph = await Globalapi.predictionGraph();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              What If
            </h1>
            <div className="relative">
              <NFTDropdown addNfts={addNFTS}/>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            
            <div className=" flex items-center justify-center">
                <User /> 
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 flex gap-4">
        {/* Left Sidebar */}
        <aside className="w-64 space-y-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Top NFTs</h2>
              <Menu nftCollections={nftCollections}/>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4 text-purple-500 ">My Collection</h2>
               {myCollections?.map((nft,index)=>(
                
                <li key={index}> {nft.address.length > 15
                  ? `${nft.address.slice(0, 13)}`
                  : nft.address}</li>
               ))}
          </div>
        </aside>
      
        <main className="flex-1 space-y-4">
        <ChatBot />
        {/*Analytics */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-md p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <LineChart size={20} />
                <span>Line Graph</span>
              </h2>
              <div className="h-60 bg-gray-700 rounded-sm flex items-center justify-center">
                 <LineGraph address={address}/>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <BarChart3 size={20} />
                <span>What If Graph</span>
              </h2>
              <div className="h-60 bg-gray-700 rounded-lg flex items-center justify-center">
                 <WhatIfGraph graphData={predictiveGraph} />
              </div>
            </div>
          </div>
        </main>
      </div>   
      </div>     
  );
}
export default App;