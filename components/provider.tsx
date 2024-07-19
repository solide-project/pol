"use client";

import { Web3Provider } from "@/components/web3-provider";

interface ProviderProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Provider({ children }: ProviderProps) {
    return <Web3Provider>
        {children}
    </Web3Provider>
}