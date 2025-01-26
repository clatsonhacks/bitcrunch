import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

function ProfileButton() {
  return (
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 p-0.5 hover:from-purple-600 hover:to-blue-600 transition-all duration-300 cursor-pointer">
      <div className="w-full h-full rounded-xl bg-gray-900 flex items-center justify-center">
        <ImageIcon size={20} className="text-gray-400" />
      </div>
    </div>
  );
}

export default ProfileButton;