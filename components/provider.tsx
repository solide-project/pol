"use client";

import { Web3Provider } from "@/components/web3-provider";
import { Provider as WCProvider } from "@/lib/wallet/src";

interface ProviderProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Provider({ children }: ProviderProps) {
    return <WCProvider ocredirectUri={process.env.NEXT_PUBLIC_OC_CONNECT || ""}>
        <Web3Provider>
            {children}
        </Web3Provider>
    </WCProvider>
}