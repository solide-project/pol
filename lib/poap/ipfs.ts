export const ipfsGateway = 'https://api.universalprofile.cloud/ipfs/'

export const getIPFSJson = async (uri: string) => {
    uri = uri.replace('ipfs://', ipfsGateway)
    const response = await fetch(uri)
    return response.json()
}