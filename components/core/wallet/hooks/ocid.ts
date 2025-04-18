import { useOCAuth } from "@opencampus/ocid-connect-js";
import { IWalletConnector } from "./wallet-connector";

export const useWCOCID = (): IWalletConnector => {
    const { authState, ocAuth } = useOCAuth();

    const connect = async () => {
        try {
            if (authState.isAuthenticated) return true
            
            await ocAuth.signInWithRedirect({ state: 'opencampus' });
            return true;
        } catch (e: any) {
            console.log(e)
            return false;
        }
    }

    const disconnect = async () => {
        ocAuth.transactionManager.clear()
        ocAuth.tokenManager.clear()
        // updateAuthState({
        //     accessToken: "",
        //     idToken: "",
        //     isAuthenticated: false,
        //     error: "",
        // });
        await ocAuth.logout(process.env.NEXT_PUBLIC_OC_CONNECT);
    }

    const getAccount = async () => {
        try {
            const account: string = ocAuth?.ethAddress
            return account as `0x${string}`
        } catch (e: any) {
            console.error(e)
            return "" as `0x${string}`
        }
    }

    const getNSAccount = async () => {
        try {
            const account: string = ocAuth?.ethAddress
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