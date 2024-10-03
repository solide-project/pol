import { getContract, GetContractReturnType, PublicClient, WalletClient, createPublicClient, http } from "viem";
import { ChainID, getRPC } from "../chains";
import { abi } from "./abi";

/**
 * Currently in testnet, but will be added to mainnet
 */
const contracts: Record<string, `0x${string}`> = {
    [ChainID.OPEN_CAMPUS_CODEX]: "0x9B6089b63BEb5812c388Df6cb3419490b4DF4d54",
}

export const getContractAddress = (chain: string) => contracts[chain] || "0x"

interface POLPoapContractConfig {
    chain?: string;
    client?: WalletClient;
}

export class POLPoapContract {
    contract: GetContractReturnType<typeof abi, PublicClient | WalletClient>;
    client: PublicClient | WalletClient;
    chain: string = ChainID.OPEN_CAMPUS_CODEX;

    constructor({ client }: POLPoapContractConfig) {
        const rpc = getRPC(this.chain)
        const publicClient = createPublicClient({
            transport: http(rpc),
        })
        this.client = client || publicClient;
        const address = getContractAddress(this.chain)
        this.contract = getContract({
            address,
            abi,
            client: { public: publicClient, wallet: this.client },
        })
    }

    async contractURI() {
        return this.contract.read.contractURI() as unknown as string;
    }

    async getOwnedTokenIds(account: `0x${string}`) {
        // return [BigInt(0), BigInt(1)]   // For testing purpose
        return this.contract.read.getOwnedTokenIds([account]) as unknown as BigInt[];
    }

    async uri(tokenId: string) {
        return this.contract.read.uri([tokenId]) as unknown as string;
    }

    async mintTracker(tokenId: string, account: string) {
        return this.contract.read.mintTracker([account, tokenId]) as unknown as BigInt;
    }

    async totalSupply(tokenId: string) {
        return this.contract.read.totalSupply([tokenId]) as unknown as BigInt;
    }

    async mint(account: string, tokenId: string, data: `0x${string}` = "0x") {
        return this.contract.write.mint([account, tokenId, data]);
    }
} 