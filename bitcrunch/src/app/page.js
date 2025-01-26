import ChatBot from "@/_components/ChatBot";
import LineGraph from "@/_components/LineGraph";
import Menu from "@/_components/Menu";
import Nft from "@/_components/Nft";
import Globalapi from "@/_utils/Globalapi";


export default async function Home() {
  const nftCollections = await Globalapi.getNFTCollections();
  const linegraph = await Globalapi.getAddress();
  const addNFTs = await Globalapi.addNFTS();
  console.log(addNFTs);
  return (
    <div  >
        <Menu nftCollections={nftCollections}/>
        <ChatBot />
        <Nft addNFTS={addNFTs} />
        <LineGraph address={linegraph} />
    </div>
  );
}
