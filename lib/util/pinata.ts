export interface IpfsResponse {
    IpfsHash: string;
    PinSize: number;
    Timestamp: string;
    isDuplicate?: boolean;
}

export const uploadJSONToIPFS = async ({
    data,
    name = "metadata",
    group = ""
}: {
    data: any,
    name?: string,
    group?: string,
}) => {
    const requestOptions: any = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.PINATA_JWT}`,
            'Content-Type': 'application/json'
        },
        body: `{"pinataMetadata":{"name":"${name}.json"},"pinataContent":${JSON.stringify(data)}}`
    };

    const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", requestOptions)

    if (!response.ok) {
        throw new Error(`Error: ${response.status}: ${response.statusText}`)
    }

    return await response.json() as IpfsResponse
}