import React from 'react';

function NFTList({ nfts }) {
  return (
    <div className="space-y-4">
      {nfts.map(nft => (
        <div 
          key={nft.id} 
          className="flex justify-between items-center p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer group"
        >
          <span className="font-medium text-gray-300 group-hover:text-white transition-colors">
            {nft.name}
          </span>
          <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
            {nft.price}
          </span>
        </div>
      ))}
    </div>
  );
}

export default NFTList;