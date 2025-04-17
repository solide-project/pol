"use client";

import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { eduChain } from '@/lib/poap/chain';

const config = getDefaultConfig({
    appName: 'Proof of Learn',
    projectId: 'dc477f9e3cb313350f93e2ee73e2a57c',
    chains: [eduChain],
    ssr: true,
});

const queryClient = new QueryClient();
export function WalletProvider({ children }: WalletProviderProps) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    {children}
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
};

interface WalletProviderProps extends React.HTMLAttributes<HTMLDivElement> {
}