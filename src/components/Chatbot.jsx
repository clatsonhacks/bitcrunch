import React from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

function Chatbot({ message, setMessage, messages, handleSendMessage }) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 h-[28rem] flex flex-col backdrop-blur-xl border border-gray-800/50 shadow-xl">
      <MessageList messages={messages} />
      <ChatInput 
        message={message}
        setMessage={setMessage}
        onSend={handleSendMessage}
      />
    </div>
  );
}

export default Chatbot;