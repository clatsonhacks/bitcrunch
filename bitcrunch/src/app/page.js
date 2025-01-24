import ChatBot from "@/_components/ChatBot";
import LineGraph from "@/_components/LineGraph";
import Menu from "@/_components/Menu";
import Globalapi from "@/_utils/Globalapi";


export default async function Home() {
  const nftCollections = await Globalapi.getNFTCollections();
  const linegraph = await Globalapi.getAddress();
  return (
    <div  >
        <Menu nftCollections={nftCollections}/>
        <ChatBot />
        <LineGraph address={linegraph} />
    </div>
  );
}
