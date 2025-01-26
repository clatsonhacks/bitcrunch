const options = {
    method: "GET",
    headers: { accept: "application/json", "x-api-key": "a5f803529351e301a184a240bffc5fad" },
  };

  const getNFTCollections=()=>fetch(
    "https://api.unleashnfts.com/api/v1/collections?currency=usd&metrics=assets&sort_by=marketcap&sort_order=desc&offset=0&limit=4&time_range=24h&include_washtrade=true",
    options
  ).then(res=>res.json())
  .then(res=>{ 
    return res})

    const getAddress = () =>
        fetch("http://localhost:3001/api/data")
          .then((res) => res.json())
          .then((data) => {
            const lastAddress = data.length > 0 ? data[data.length - 1].address : null; 
            return lastAddress; 
          })
          const nfts = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-api-key': 'a5f803529351e301a184a240bffc5fad'}
          };
  const addNFTS=()=>fetch('https://api.unleashnfts.com/api/v2/nft/top_deals?sort_by=listing_timestamp&sort_order=desc&offset=0&limit=30', nfts)
      .then(res => res.json())
      .then(res => {console.log(res)
        return res
      })
      .catch(err => console.error(err));
  
      
  export default {
    getNFTCollections,
    getAddress,
    addNFTS
  };