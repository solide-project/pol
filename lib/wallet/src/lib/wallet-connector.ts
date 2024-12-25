export enum WalletConnectorEnum {
    METAMASK = 1,
    OCID = 2,
    COINBASE = 3
}

export interface IWalletConnector {
    disconnect: () => Promise<void>
    connect: () => Promise<boolean>
    getAccount: () => Promise<`0x${string}`>
    getNSAccount: () => Promise<`0x${string}`>
}

export const getWalletName = (wallet: WalletConnectorEnum) => {
    switch (wallet) {
        case WalletConnectorEnum.METAMASK:
            return "Metamask"
        case WalletConnectorEnum.OCID:
            return "Open Campus ID"
        case WalletConnectorEnum.COINBASE:
            return "Coinbase Smart Wallet"
    }
}