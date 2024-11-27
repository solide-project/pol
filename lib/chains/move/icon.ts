import { ChainID } from "./chain-id"

export const getIconByChainId = (chainId: string): string =>
    `https://raw.githubusercontent.com/solide-project/icons/master/crypto/${getIcon(chainId)}`

const getIcon = (chainId: string): string => {
    switch (chainId) {
        case ChainID.SUI_DEVNET:
        case ChainID.SUI_MAINNET:
        case ChainID.SUI_TESTNET:
            return "sui.svg"
        case ChainID.MOVEMENT_BAKU:
        case ChainID.MOVEMENT_DEVNET:
            return "movement.svg"
        default:
            return ""
    }
}
