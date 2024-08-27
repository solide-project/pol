"use client";

import { Web3Provider } from "@/components/web3-provider";
import { OCConnect } from '@opencampus/ocid-connect-js';

interface ProviderProps extends React.HTMLAttributes<HTMLDivElement> {
}

const opts: any = {
    redirectUri: 'https://proof-of-learn.vercel.app/redirect',
}

export function Provider({ children }: ProviderProps) {
    return <OCConnect opts={opts} sandboxMode={true}>
        <Web3Provider>
            {children}
        </Web3Provider>
    </OCConnect>
}