"use client";

import '@rainbow-me/rainbowkit/styles.css';

import {
    Chain,
    darkTheme,
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    mainnet,
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";

const openCampusCodex = {
    id: 656476,
    name: 'Open Campus Codex',
    iconUrl: 'https://www.opencampus.xyz/static/media/coin-logo.39cbd6c42530e57817a5b98ac7621ca7.svg',
    iconBackground: '#fff',
    nativeCurrency: { name: 'Open Campus', symbol: 'EDU', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.open-campus-codex.gelato.digital'] },
    },
    blockExplorers: {
        default: { name: 'Blockscout', url: 'https://opencampus-codex.blockscout.com/' },
    }
} as const satisfies Chain;

const queryClient = new QueryClient();

const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: 'a1b35841e59f1b3f83c5a35d6f6c1824',
    chains: [openCampusCodex],
    ssr: true, // If your dApp uses server side rendering (SSR)
});


interface Web3ProviderProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Web3Provider({ children }: Web3ProviderProps) {
    return <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme()}>
                {children}
            </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
};