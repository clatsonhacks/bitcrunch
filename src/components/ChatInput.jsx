import React from 'react';
import { Send, Search } from 'lucide-react';

function ChatInput({ message, setMessage, onSend }) {
  return (
    <div className="flex space-x-3">
      <div className="flex-1 bg-gray-800/70 rounded-xl backdrop-blur-sm border border-gray-700/50 focus-within:border-purple-500/50 transition-colors">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-transparent px-4 py-3 focus:outline-none text-gray-200 placeholder-gray-500"
          placeholder="Ask anything..."
        />
      </div>
      <button 
        onClick={onSend}
        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/20"
      >
        <Send size={20} />
      </button>
      <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/20">
        <Search size={20} />
      </button>
    </div>
  );
}

export default ChatInput;