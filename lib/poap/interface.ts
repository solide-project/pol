export interface Poap {
    tokenId: BigInt;
    timestamp: BigInt;
    uri: string;
    metadata: PoapMetadata;
    verification: string; // IPFS
}

export interface PoapMetadata {
    name: string;
    description: string;
    image: string;
}

export interface TransferLogData {
    eventName: string
    blockNumber: bigint
    transactonHash: string
    logIndex: bigint
    timestamp: bigint
    args: {
        operator?: `0x${string}` | undefined;
        from?: `0x${string}` | undefined;
        to?: `0x${string}` | undefined;
        id?: BigInt | undefined;
        value?: BigInt | undefined;
    }
}