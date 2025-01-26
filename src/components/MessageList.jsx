import React from 'react';

function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar">
      {messages.map((msg, index) => (
        <div 
          key={index} 
          className="bg-gray-800/70 p-4 rounded-xl backdrop-blur-sm border border-gray-700/50"
        >
          <p className="text-gray-200">{msg}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList;