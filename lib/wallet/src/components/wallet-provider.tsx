"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { WalletConnectorEnum } from "../lib/wallet-connector";
import { useWCOCID } from "../lib/ocid";
import { useWCMetamask } from "../lib/metamask";
import { useOCAuth } from "@opencampus/ocid-connect-js";


export function WalletProvider({ children }: WalletProviderProps) {
    const { ocAuth, authState } = useOCAuth();

    const ocid = useWCOCID()
    const mm = useWCMetamask()

    const [walletProvider, setWalletProvider] = useState<WalletConnectorEnum | undefined>(undefined)
    const [selectedAccount, setSelectedAccount] = useState<`0x${string}`>("" as `0x${string}`)

    useEffect(() => {
        (async () => {
            console.log("Changed Provider", walletProvider)
            setSelectedAccount(await getAccount())
        })()
    }, [walletProvider])

    // For OCID redirect back
    useEffect(() => {
        (async () => {
            if (authState.isAuthenticated) {
                setWalletProvider(WalletConnectorEnum.OCID)
            }
            // else if (window.ethereum) {
            //     const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            //     if (accounts) {
            //         setWalletProvider(WalletConnectorEnum.METAMASK)
            //     }
            // }
        })()
    }, []);
    useEffect(() => {
        if (authState.isAuthenticated) {
            setWalletProvider(WalletConnectorEnum.OCID)
        }
    }, [authState.isAuthenticated]);


    // Metamask
    useEffect(() => {
        const handleAccountsChanged = (accounts: any) => {
            if (walletProvider !== WalletConnectorEnum.METAMASK) return

            console.log("Account Changed", accounts)
            const account = accounts[0] as `0x${string}`;
            setSelectedAccount(account);
        };

        if (!window.ethereum) return;
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        console.log("add accountsChanged")

        return () => {
            window?.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        };
    }, []);

    const isConnected = async () => {
        if (walletProvider === undefined) return false

        let connector = null;
        switch (walletProvider) {
            case WalletConnectorEnum.METAMASK:
                connector = mm.getAccount
                break;
            case WalletConnectorEnum.OCID:
                connector = ocid.getAccount
                break;
        }

        if (connector) {
            const account = await connector()
            if (account) return true
        }

        return false
    }

    const getAccount = async (): Promise<`0x${string}`> => {
        if (walletProvider === undefined) return "" as `0x${string}`

        let caller = null;
        switch (walletProvider) {
            case WalletConnectorEnum.METAMASK:
                caller = mm.getAccount
                break;
            case WalletConnectorEnum.OCID:
                caller = ocid.getAccount
                break;
        }

        if (!caller) return "" as `0x${string}`

        return await caller()
    }

    const disconnect = async () => {
        if (walletProvider === undefined) return

        let disconnector = null;
        switch (walletProvider) {
            case WalletConnectorEnum.METAMASK:
                disconnector = mm.disconnect
                break;
            case WalletConnectorEnum.OCID:
                disconnector = ocid.disconnect
                break;
        }

        if (!disconnector) return

        // Do Disconnect
        await disconnector()
        setWalletProvider(undefined)
    }

    return <WalletContext.Provider
        value={{
            walletProvider,
            setWalletProvider,
            isConnected,
            getAccount,
            disconnect,
            selectedAccount,
        }}
    >
        {children}
    </WalletContext.Provider>
}

interface WalletProviderProps extends React.HTMLAttributes<HTMLDivElement> {
}

interface WalletContextType {
    walletProvider: WalletConnectorEnum | undefined;
    setWalletProvider: (wallet: WalletConnectorEnum) => void;
    isConnected: () => Promise<boolean>;
    getAccount: () => Promise<`0x${string}` | null>;
    disconnect: () => Promise<void>;
    selectedAccount: `0x${string}`;
}

const WalletContext = createContext<WalletContextType>({
    walletProvider: undefined,
    setWalletProvider: () => { },
    isConnected: async () => { return false; },
    getAccount: async () => { return null; },
    disconnect: async () => { },
    selectedAccount: "" as `0x${string}`,
});


export const useWallet = () => useContext(WalletContext)