"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Menu({ nftCollections }) {
  const [data, setData] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    fetch("http://localhost:3001/api/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Handle form submission
  const handleSubmit = (address) => {
    fetch("http://localhost:3001/api/save", {
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
    <div>
      <ul>
        <h1>NFT Collections</h1>
        {nftCollections?.collections?.length > 0 ? (
          nftCollections.collections.map((nfts) => (
            <li key={nfts.metadata.contract_address}>
              <Image
                src={nfts.metadata.thumbnail_url}
                width={30}
                height={30}
                alt="Thumbnail"
              />
              {nfts.metadata.name.length > 15
                ? `${nfts.metadata.name.slice(0, 15)}...`
                : nfts.metadata.name}
              <Button
                onClick={() => handleSubmit(nfts.metadata.contract_address)}
              >
                Save
              </Button>
            </li>
          ))
        ) : (
          <p>Loading NFTs...</p>
        )}
      </ul>
    </div>
  );
}

export default Menu;
