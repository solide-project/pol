"use client";

import { WalletProvider } from "./wallet-provider";
import { OCConnect } from '@opencampus/ocid-connect-js';

interface ProviderProps extends React.HTMLAttributes<HTMLDivElement> {
    ocredirectUri: string
}

export function Provider({ ocredirectUri, children }: ProviderProps) {
    return <OCConnect opts={{ redirectUri: ocredirectUri || "" }} sandboxMode={false}>
        <WalletProvider>
            {children}
        </WalletProvider>
    </OCConnect>
}