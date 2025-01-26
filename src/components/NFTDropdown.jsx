import React from 'react';
import { ChevronDown } from 'lucide-react';

function NFTDropdown({ selectedOption, setSelectedOption }) {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const options = ['NFT Marketplace', 'NFT Top Deals', 'NFT Transactions'];

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 bg-gray-800/80 px-6 py-2.5 rounded-xl hover:bg-gray-700/80 transition-all duration-300 backdrop-blur-lg border border-gray-700/50 shadow-lg hover:border-purple-500/50"
      >
        <span className="text-gray-200">{selectedOption}</span>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} 
        />
      </button>
      {showDropdown && (
        <div className="absolute top-full mt-2 w-56 bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl py-2">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelectedOption(option);  // Update the selected option
                setShowDropdown(false);  // Close the dropdown
              }}
              className={`w-full text-left px-6 py-2 hover:bg-gray-700/50 transition-colors ${
                selectedOption === option 
                  ? 'text-purple-400 bg-gray-700/30' 
                  : 'text-gray-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default NFTDropdown;
