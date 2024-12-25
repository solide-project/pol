import { IWalletConnector } from "./wallet-connector";

export const useWCCoinbase = (): IWalletConnector => {
    const connect = async () => {
        try {
            if (!window.ethereum) {
                throw Error("Metamask not detected")
            }

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log(accounts)
            return true;
        } catch (e: any) {
            console.log(e)
            return false;
        }
    }

    const disconnect = async () => {
        console.log(disconnect)
    }

    const getAccount = async () => {
        try {
            const [account] = await window?.ethereum?.request({
                method: 'eth_requestAccounts'
            }) as [string]
            return account as `0x${string}`
        } catch (e: any) {
            console.error(e)
            return "" as `0x${string}`
        }
    }

    const getNSAccount = async () => {
        try {
            const [account] = await window?.ethereum?.request({
                method: 'eth_requestAccounts'
            }) as [string]
            return account as `0x${string}`
        } catch (e: any) {
            console.error(e)
            return "" as `0x${string}`
        }
    }

    return {
        connect,
        disconnect,
        getAccount,
        getNSAccount
    }
}