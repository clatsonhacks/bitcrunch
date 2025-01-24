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
            const lastAddress = data.length > 0 ? data[data.length - 1].address : null; // Get the last address
            return lastAddress; 
          })
      
  export default {
    getNFTCollections,
    getAddress
  };