"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function Nft({ addNFTS }) {
  const [collection, setCollection] = useState([]);

  const handleClick = (collectionName) => {
    // Avoid adding duplicates to the collection
    if (!collection.includes(collectionName)) {
      setCollection((prevCollection) => [...prevCollection, collectionName]);
    }
  };

  return (
    <div className="nft-container">
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1"
        >
          Click
        </div>
        <div
          tabIndex={0}
          className="dropdown-content card card-compact bg-primary text-primary-content z-[1] w-64 p-2 shadow"
        >
          {addNFTS?.data?.length > 0 ? (
            addNFTS.data.map((nfts, index) => (
              <div className="card-body" key={index}>
                <h3>{nfts.collection_name}</h3>
                <Button
                  onClick={() => handleClick(nfts.collection_name)}
                >
                  Add to collection
                </Button>
              </div>
            ))
          ) : (
            <p>No NFTs available</p>
          )}
        </div>
      </div>
      {collection.length > 0 && (
        <div className="collection-list mt-4">
          <h2>Your Collection:</h2>
          <ul>
            {collection.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Nft;
