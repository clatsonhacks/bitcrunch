import Globalapi from "@/_utils/Globalapi";

export const handleCategory = async (category) => {
  const contractAddress = await Globalapi.getAddress();
  console.log(contractAddress);
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
              "x-api-key": process.env.NEXT_PUBLIC_BITSCRUNCH_API_KEY,
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

    case "2":
      console.log("Category 2: Fetching NFT price estimation metrics...");

      try {
        const response = await fetch(
          `https://api.unleashnfts.com/api/v2/nft/liquify/price_estimate?blockchain=ethereum&contract_address=${contractAddress}&token_id=${tokenId}`,
          {
            headers: {
              accept: "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_BITSCRUNCH_API_KEY,
            },
          }
        );

        const result = await response.json();
        console.log("Fetched Data:", result.data);
        return result.data || [];
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }

      case "3":
        console.log("Category 3: Fetching NFT wallet gaming metrics...");
  
        try {
          const response = await fetch(
            `https://api.unleashnfts.com/api/v2/nft/wallet/gaming/metrics?blockchain=ethereum&contract_address=0x34e158883efc81c5d92fde785fba48db738711ee&time_range=24h&offset=0&limit=30&sort_by=total_users&sort_order=desc`,
            {
              headers: {
                accept: "application/json",
                "x-api-key": process.env.NEXT_PUBLIC_BITSCRUNCH_API_KEY,
              },
            }
          );
  
          const result = await response.json();
          console.log("Fetched Data:", result.data);
          return result.data || [];
        } catch (error) {
          console.error("Error fetching data:", error);
          return [];
      }
      
      case "4":
        console.log("Category 4: NFT Top Deals-related question.");
        
        try {
          const response = await fetch(
            `https://api.unleashnfts.com/api/v2/nft/top_deals?sort_by=deal_score&sort_order=desc&offset=0&limit=10`,
            {
              headers: {
                accept: "application/json",
                "x-api-key": process.env.NEXT_PUBLIC_BITSCRUNCH_API_KEY,
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
