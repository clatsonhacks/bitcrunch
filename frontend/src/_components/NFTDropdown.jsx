"use client"
import React, { useEffect, useState } from 'react';

function NFTDropdown({addNfts}) {
  const [data, setData] = useState([]);
  const [showDropdown,setShowDropdown] = React.useState(false);

  // Fetch data from backend
  useEffect(() => {
    fetch("https://bitcrunch-backend.vercel.app/api/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle form submission
  const handleClick = (address) => {
    fetch("https://bitcrunch-backend.vercel.app/api/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: address }),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
        setData((prev) => [...prev, result.data]); // Update data list
      })
      .catch((error) => console.error("Error saving data:", error));
  };
  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 py-3 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
      >
        NFT COLLECTIONS
      </button>
      {showDropdown && (
        <div className="absolute top-full mt-2 w-56 bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl py-2">
        {addNfts?.data?.length > 0 ? (
            addNfts.data.map((nfts, index) => (
                <button
                 key={index}
                 onClick={() => {
                   setShowDropdown(false)
                   ,handleClick(nfts.collection_name)
                 }}
                  className="w-full text-left px-6 py-2 hover:bg-gray-700/50 transition-colors text-purple-400 bg-gray-700/30 text-gray-300"
                >
                  {nfts.collection_name}
                </button>
            ))
          ) : (
            <p>No NFTs available</p>
          )} 
          </div>
               )}
      
    </div>
  );
}

export default NFTDropdown;
