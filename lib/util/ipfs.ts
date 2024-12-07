export const ipfsGateway = 'https://api.universalprofile.cloud/ipfs/'

export const retrieve = async (uri: string) => {
    uri = uri.replace('ipfs://', ipfsGateway)
    const response = await fetch(uri)
    return response.json()
}

export const upload = async ({ data, name = "metadata", }:
    { data: any, name?: string, }) => {
    const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.PINATA_JWT}`,
            'Content-Type': 'application/json'
        },
        body: `{"pinataMetadata":{"name":"${name}.json"},"pinataContent":${JSON.stringify(data)}}`
    })

    if (!response.ok) {
        throw new Error(`Error: ${response.status}: ${response.statusText}`)
    }

    return await response.json() as {
        IpfsHash: string;
        PinSize: number;
        Timestamp: string;
        isDuplicate?: boolean;
    }
}