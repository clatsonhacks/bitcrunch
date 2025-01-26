import React from 'react';
import NFTList from './NFTList';
import AddNFTButton from './AddNFTButton';

function Sidebar() {
  const placeholderNFTs = [
    { id: 1, name: 'Bored Ape #1234', price: '120 ETH' },
    { id: 2, name: 'CryptoPunk #5678', price: '89 ETH' },
    { id: 3, name: 'Doodle #9101', price: '15 ETH' },
  ];

  return (
    <aside className="w-72 space-y-6">
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 backdrop-blur-xl border border-gray-800/50 shadow-xl">
        <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Top NFTs
        </h2>
        <NFTList nfts={placeholderNFTs} />
      </div>
      
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 backdrop-blur-xl border border-gray-800/50 shadow-xl">
        <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          My Collection
        </h2>
        <AddNFTButton />
      </div>
    </aside>
  );
}

export default Sidebar;