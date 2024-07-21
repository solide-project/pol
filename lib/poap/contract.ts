import { getContract, GetContractReturnType, PublicClient, Client, WalletClient, createPublicClient, http } from "viem";
import { ChainID, getRPC } from "../chains";
import { abi } from "./abi";

export const getContractAddress = (chain: string): `0x${string}` => {
    switch (chain) {
        case ChainID.OPEN_CAMPUS_CODEX:
            return "0x9B6089b63BEb5812c388Df6cb3419490b4DF4d54";
        default:
            return "0x9B6089b63BEb5812c388Df6cb3419490b4DF4d54";
    }
}

export class POLPoapContract {
    contract: GetContractReturnType<typeof abi, PublicClient | WalletClient>;
    client: PublicClient | WalletClient;
    chain: string = ChainID.OPEN_CAMPUS_CODEX;

    constructor({
        client,
    }: {
        chain?: string;
        client?: WalletClient;
    }) {
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
        return this.contract.read.getOwnedTokenIds([account]) as unknown as BigInt[];
    }

    async uri(tokenId: string) {
        return this.contract.read.uri([tokenId]) as unknown as string;
    }

    async mintTracker(tokenId: string, account: string) {
        return this.contract.read.mintTracker([account, tokenId]) as unknown as BigInt;
    }

    async mint(account: string, tokenId: string, data: `0x${string}` = "0x") {
        return this.contract.write.mint([account, tokenId, data]);
    }
} 