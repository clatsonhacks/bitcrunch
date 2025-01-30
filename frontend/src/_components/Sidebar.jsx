import React from 'react';
import AddNFTButton from './AddNFTButton';
import Menu from './Menu';


function Sidebar() {
 

  return (
    <aside className="w-72 space-y-6">
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 backdrop-blur-xl border border-gray-800/50 shadow-xl">
        <h2 className="text-xl font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Top NFTs
        </h2>
        <Menu />
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