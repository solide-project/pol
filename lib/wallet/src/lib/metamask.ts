import { IWalletConnector } from "./wallet-connector";

export const useWCMetamask = (): IWalletConnector => {
    const connect = async () => {
        try {
            if (!window.ethereum) {
                throw Error("Metamask not detected")
            }

            const [account] = await requestAccount()
            return true;
        } catch (e: any) {
            console.log(e)
            return false;
        }
    }

    const disconnect = async () => {
    }

    const getAccount = async () => {
        try {
            if (!window.ethereum) return "" as `0x${string}`

            const [account] = await requestAccount()
            return account as `0x${string}`
        } catch (e: any) {
            console.error(e)
            return "" as `0x${string}`
        }
    }

    const getNSAccount = async () => {
        try {
            if (!window.ethereum) return "" as `0x${string}`

            const [account] = await requestAccount()
            return account as `0x${string}`
        } catch (e: any) {
            console.error(e)
            return "" as `0x${string}`
        }
    }

    const requestAccount = async (): Promise<string[]> => {
        return await window?.ethereum?.request({
            method: 'eth_requestAccounts'
        }) as string[]
    }

    return {
        connect,
        disconnect,
        getAccount,
        getNSAccount
    }
}