import { getFullnodeUrl } from "@mysten/sui/client"
import { ChainID } from "./chain-id"

const data: { [key: string]: string } = {
    [ChainID.SUI_DEVNET]: getFullnodeUrl("devnet"),
    [ChainID.SUI_MAINNET]: "https://sui-mainnet-endpoint.blockvision.org",
    // [ChainID.SUI_TESTNET]: "https://sui-testnet-endpoint.blockvision.org",
    [ChainID.SUI_TESTNET]: getFullnodeUrl("testnet"),
    [ChainID.MOVEMENT_DEVNET]: "https://devnet.baku.movementlabs.xyz",
    [ChainID.MOVEMENT_BAKU]: "https://devnet.baku.movementlabs.xyz",
}

export const getRPC = (network: string): string => data[network] || ""