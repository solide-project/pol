import { eduChain, eduChainTestnet } from "./chain";

export const contracts: Record<string, `0x${string}`> = {
    [eduChain.id]: "0x7aEb202a1568a80d78A68aA51211cFE3BCD315F9",

    /**
     *  "0x9B6089b63BEb5812c388Df6cb3419490b4DF4d54"
     *  "0x4DB78091c718F7a3E2683c2D730Fc86DfF322235""
     * */
    [eduChainTestnet.id]: "0xB10999282d0DD5990DB97b6EEa2F07b6ca9275D0",

}

export const getRPC = (chain: string) => {
    if (chain === eduChainTestnet.id.toString()) {
        return eduChainTestnet.rpcUrls.default.http[0]
    }

    return eduChain.rpcUrls.default.http[0]
}

export const getChain = (chain: string) => {
    if (chain === eduChainTestnet.id.toString()) {
        return eduChainTestnet
    }

    return eduChain
}


export const getContractAddress = (chain: string) => contracts[chain] || "0x"