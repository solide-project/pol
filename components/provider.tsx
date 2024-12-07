"use client";

import { Web3Provider } from "@/components/web3-provider";
import { OCConnect } from '@opencampus/ocid-connect-js';

interface ProviderProps extends React.HTMLAttributes<HTMLDivElement> {
}

const opts: any = {
    redirectUri: process.env.NEXT_PUBLIC_OC_CONNECT,
}

export function Provider({ children }: ProviderProps) {
    return <OCConnect opts={opts} sandboxMode={true}>
        <Web3Provider>
            {children}
        </Web3Provider>
    </OCConnect>
}