import React from 'react';
import { Wallet } from 'lucide-react';

function ConnectWalletButton() {
  return (
    <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-6 py-2.5 rounded-xl flex items-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
      <Wallet size={18} />
      <span className="font-medium">Connect Wallet</span>
    </button>
  );
}

export default ConnectWalletButton;