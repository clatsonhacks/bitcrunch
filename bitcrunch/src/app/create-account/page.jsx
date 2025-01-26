import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { ConnectButton, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './wagmi';
import Index from '.';

const client = new QueryClient();

function MyApp({component,pageprops}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <Component {...pageProps}/>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;