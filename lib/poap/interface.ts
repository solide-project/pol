export interface PoapMetadata {
    name: string;
    description: string;
    image: string;
}

export interface Poap {
    tokenId: BigInt;
    timestamp: BigInt;
    uri: string;
    metadata: PoapMetadata;
}