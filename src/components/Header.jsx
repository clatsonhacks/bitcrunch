import React from 'react';
import NFTDropdown from './NFTDropdown';
import ConnectWalletButton from './ConnectWalletButton';
import ProfileButton from './ProfileButton';

function Header({ selectedNFTOption, setSelectedNFTOption }) {
  return (
    <header className="border-b border-gray-800/50 backdrop-blur-xl bg-gray-900/50 sticky top-0 z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              What If
            </span>
          </h1>
          <NFTDropdown 
            selectedOption={selectedNFTOption} 
            setSelectedOption={setSelectedNFTOption}
          />
        </div>
        
        <div className="flex items-center space-x-6">
          <ConnectWalletButton />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}

export default Header;