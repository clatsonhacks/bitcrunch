import React from 'react';
import { Plus } from 'lucide-react';

function AddNFTButton() {
  return (
    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-3 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
      <Plus size={18} />
      <span className="font-medium">Add NFT</span>
    </button>
  );
}

export default AddNFTButton;