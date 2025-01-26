import React from 'react';

function Graph({ title, icon: Icon }) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 backdrop-blur-xl border border-gray-800/50 shadow-xl">
      <h2 className="text-xl font-semibold mb-6 flex items-center space-x-3">
        <Icon size={24} className="text-blue-400" />
        <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      <div className="h-48 bg-gray-800/70 rounded-xl flex items-center justify-center border border-gray-700/50">
        <span className="text-gray-400">Placeholder for {title}</span>
      </div>
    </div>
  );
}

export default Graph;