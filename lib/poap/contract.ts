import { PublicClient, WalletClient, createPublicClient, http, Account, Abi, parseAbiItem } from "viem";
import { abi } from "./abi";
import { getChain, getContractAddress, getRPC } from "./utils";
import { selectedNetwork } from ".";
import { getAPI } from "../chains";
import { TransferLogData } from "./interface";

interface POLPoapContractConfig {
    chain?: string
    wallet?: WalletClient
}

/**
 * Note when building, viem will throw Mismatch on totalSupply as there is overload function.
 * Use the one that accepts one argument.
 */
export class POLPoapContract {
    // contract: GetContractReturnType<typeof abi, PublicClient | WalletClient> = {} as any;
    contract: {
        address: `0x${string}`,
        abi: Abi,
    }
    chain: string = selectedNetwork.id.toString();

    publicClient: PublicClient;
    walletClient?: WalletClient;

    constructor({ wallet, chain = selectedNetwork.id.toString() }: POLPoapContractConfig) {
        const rpc = getRPC(chain)
        this.contract = {
            address: getContractAddress(chain),
            abi: abi,
        }
        this.chain = chain
        this.publicClient = createPublicClient({
            transport: http(rpc),
        })
        this.walletClient = wallet
    }

    private get contractParams() {
        return {
            address: this.contract.address,
            abi: this.contract.abi,
        }
    }

    async contractURI() {
        return await this.publicClient.readContract({
            ...this.contractParams,
            functionName: 'contractURI',
        }) as string;
    }

    async getOwnedTokenIds(account: `0x${string}`) {
        // return [BigInt(0), BigInt(1)]   // For testing purpose
        return await this.publicClient.readContract({
            ...this.contractParams,
            functionName: 'getOwnedTokenIds',
            args: [account]
        }) as BigInt[]
    }

    async uri(tokenId: string) {
        return await this.publicClient.readContract({
            ...this.contractParams,
            functionName: 'uri',
            args: [tokenId]
        }) as string
    }

    async mintTracker(tokenId: string, account: string) {
        return await this.publicClient.readContract({
            ...this.contractParams,
            functionName: 'mintTracker',
            args: [account, tokenId]
        }) as BigInt
    }

    async totalSupply(tokenId: string) {
        return await this.publicClient.readContract({
            ...this.contractParams,
            functionName: 'totalSupply',
            args: [tokenId]
        }) as BigInt
    }

    async totalSupplyAll() {
        return await this.publicClient.readContract({
            address: this.contract.address,
            abi: [
                {
                    "inputs": [],
                    "name": "totalSupply",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ],
            functionName: 'totalSupply',
        }) as BigInt
    }

    async mint(account: string, tokenId: string, data: `0x${string}` = "0x", verification: string = "", signature: string = "") {
        if (!this.walletClient)
            throw new Error("Wallet is not provided")

        return await this.walletClient?.writeContract({
            chain: getChain(this.chain),
            account: this.walletClient.account as Account,
            ...this.contractParams,
            functionName: 'mint',
            args: [account, tokenId, data, verification, signature]
        })
    }

    async getVerification(account: `0x${string}`, id: number) {
        return await this.publicClient.readContract({
            ...this.contractParams,
            functionName: 'getVerification',
            args: [account, id]
        }) as string
    }

    async getAllTransfers(limit: number = 5) {
        // const logs = await this.publicClient.getLogs({
        //     ...this.contractParams,
        //     event: parseAbiItem('event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value)'),
        // });

        // const transfer = [...logs].sort(
        //     (a, b) => Number(b.blockNumber) - Number(a.tim) || b.logIndex - a.logIndex
        // );

        const response = await fetch(`${getAPI(this.chain)}/api/v2/addresses/${this.contract.address}/logs`)
        const logs = await response.json()
        const transfer: TransferLogData[] = await Promise.all(logs.items
            .filter((x: any) => x.decoded.method_id === `c3d58168`)
            .slice(0, limit)
            .map(async (x: any) => {
                const args: any = {};
                (x.decoded.parameters as any[]).forEach((param: any) => {
                    args[param.name] = param.value
                });
                const block = await this.publicClient.getBlock({
                    blockNumber: BigInt(x.block_number)
                })
                return {
                    eventName: `TransferSingle`,
                    blockNumber: BigInt(x.block_number),
                    timestamp: block.timestamp,
                    transactonHash: x.transaction_hash,
                    logIndex: BigInt(x.index),
                    args,
                }
            }))

        return transfer
    }
} 