const options = {
    method: "GET",
    headers: { accept: "application/json", "x-api-key": process.env.NEXT_PUBLIC_BITSCRUNCH_API_KEY },
  };

  const getNFTCollections=()=>fetch(
    "https://api.unleashnfts.com/api/v2/nft/top_deals?sort_by=deal_score&sort_order=desc&offset=0&limit=5",
    options
  ).then(res=>res.json())
  .then(res=>{ 
    return res})

    const getAddress =()=>fetch("https://bitcrunch-backend.vercel.app/api/data")
          .then((res) => res.json())
          .then((data) => { console.log(data)
            // Log the full array of addresses
            const lastAddress = data.length > 0 ? data[data.length - 1].address : null; // Get the last address
            return lastAddress; 
          })
          const nfts = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-api-key':process.env.NEXT_PUBLIC_BITSCRUNCH_API_KEY}
          };
          const addNFTS=()=>fetch('https://api.unleashnfts.com/api/v2/nft/top_deals?sort_by=listing_timestamp&sort_order=desc&offset=0&limit=10', nfts)
          .then(res => res.json())
          .then(res => {
            return res
          })
          .catch(err => console.error(err));
  
const myCollections=()=>fetch('https://bitcrunch-backend.vercel.app/api/data')
.then((res) => res.json())
.then((data) => {
  return data; 
})

    
const topdeals =()=>fetch('https://api.unleashnfts.com/api/v2/nft/top_deals?sort_by=deal_score&sort_order=desc&offset=0&limit=30', options)
  .then(res => res.json())
  .then(res => {console.log(res)
    return res;
  })
  .catch(err => console.error(err));

const lineGraphaddress=(topAddress)=>fetch(
    `https://api.unleashnfts.com/api/v2/nft/transactions?blockchain=ethereum&time_range=24h&contract_address=${topAddress}&offset=0&limit=30`,
    options
  );
const predictionGraph=()=>fetch('https://bitcrunch-backend.vercel.app/api/metadata')
.then((res)=> res.json())
.then((data)=>{return data});

  export default {
    getNFTCollections,
    getAddress,
    addNFTS,
    myCollections,
    topdeals,
    lineGraphaddress,
    predictionGraph
  };