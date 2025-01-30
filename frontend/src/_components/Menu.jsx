"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Menu({ nftCollections }) {
  const [data, setData] = useState([]);
  console.log(nftCollections);

  // Fetch data from backend
  useEffect(() => {
    fetch("https://bitcrunch-backend.vercel.app/api/data")
      .then((response) => response.json())
      .then((data) => {setData(data)
      })

      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle form submission
  const handleSubmit = (address) => {
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
      <ul className="space-y-4">
        {nftCollections?.data?.length > 0 ? (
          nftCollections.data.map((nfts,index) => (
            <li key={index} className="flex justify-between items-center p-3 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer group">
              <Image
                src={nfts.thumbnail_url}
                width={25}
                height={25}
                alt="Thumbnail"
              />
             <span className="mx-2 font-normal text-gray-300 group-hover:text-white transition-colors">
             {nfts.collection_name.length > 15
                ? `${nfts.collection_name.slice(0, 13)}`
                : nfts.collection_name}
              </span> 
              <Button className="text-blue-400 group-hover:text-blue-300 transition-colors"
                onClick={() => handleSubmit(nfts.contract_address)}
              >
                Save
              </Button>
            </li>
          ))
        ) : (
          <p>Loading NFTs...</p>
        )}
      </ul>
  );
}

export default Menu;
