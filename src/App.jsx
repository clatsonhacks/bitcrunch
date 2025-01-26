import React, { useState } from 'react';
import { Search, Send, Wallet, ChevronDown, Plus, LineChart, BarChart3, TextSelection as Collection, Image as ImageIcon } from 'lucide-react';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedNFTOption, setSelectedNFTOption] = useState('NFT');

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage('');
    }
  };

  const placeholderNFTs = [
    { id: 1, name: 'Bored Ape #1234', price: '120 ETH' },
    { id: 2, name: 'CryptoPunk #5678', price: '89 ETH' },
    { id: 3, name: 'Doodle #9101', price: '15 ETH' },
  ];

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
              <button className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">
                <span>{selectedNFTOption}</span>
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center space-x-2">
              <Wallet size={16} />
              <span>Connect Wallet</span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <ImageIcon size={20} />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 flex gap-4">
        {/* Left Sidebar */}
        <aside className="w-64 space-y-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Top NFTs</h2>
            <div className="space-y-3">
              {placeholderNFTs.map(nft => (
                <div key={nft.id} className="flex justify-between items-center">
                  <span>{nft.name}</span>
                  <span className="text-blue-400">{nft.price}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">My Collection</h2>
            <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2">
              <Plus size={16} />
              <span>Add NFT</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* Chatbot */}
          <div className="bg-gray-800 rounded-lg p-4 h-96 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg, index) => (
                <div key={index} className="bg-gray-700 p-3 rounded-lg">
                  {msg}
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask anything..."
              />
              <button 
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg"
              >
                <Send size={20} />
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 p-2 rounded-lg">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Analytics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <LineChart size={20} />
                <span>Line Graph</span>
              </h2>
              <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                Placeholder for Line Graph
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <BarChart3 size={20} />
                <span>What If Graph</span>
              </h2>
              <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                Placeholder for What If Graph
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
