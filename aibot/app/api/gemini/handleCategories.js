export const handleCategory = async (category) => {
    const contractAddress = "0x5bd815fd6c096bab38b4c6553cfce3585194dff9";
    const tokenId = "14247";
  
    switch (category) {
      case "1":
        console.log("Category 1: NFT collection-related question.");
        
        try {
          const response = await fetch(
            `https://api.unleashnfts.com/api/v2/nft/collection/metadata?sort_order=desc&offset=0&limit=10&contract_address=${contractAddress}`,
            {
              headers: {
                accept: "application/json",
                "x-api-key": process.env.BITSCRUNCH_API_KEY,
              },
            }
          );
  
          const result = await response.json();
          console.log("Fetched Data:", result.data);
          return result.data || [];
        } catch (error) {
          console.error("Error fetching data:", error);
          return { error: "Error fetching category 1 data" };
        }
  
      default:
        console.log("Other categories or unhandled case.");
        return [];
    }
  };
  