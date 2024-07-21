import { UserProfile } from "@/components/core/profile/user-profile";
import { Footer } from "@/components/core/shared/footer";
import { POLPoapContract } from "@/lib/poap/contract";
import { Poap, PoapMetadata } from "@/lib/poap/interface";
import { getIPFSJson } from "@/lib/poap/ipfs";
import { isAddress } from "viem";

interface SearchParams {
    params: { address: string }
}

export default async function Page({ params, }: SearchParams) {
    if (!isAddress(params.address)) {
        return <div>Not Valid</div>
    }

    const poapContract = new POLPoapContract({})
    // const contractUri = await poapContract.contractURI()

    const poaps = await poapContract.getOwnedTokenIds(params.address)

    const addressPoap: Poap[] = []

    // Batch collect all Poap data on-chain
    const uriPromises = poaps.map(poap => poapContract.uri(poap.toString()))
    const mintTrackerPromises = poaps.map(poap => poapContract.mintTracker(poap.toString(), params.address))

    const uriHashes = await Promise.all(uriPromises)
    const timestamps = await Promise.all(mintTrackerPromises)

    // Batch collect all Poap metadata from IPFS
    const metadataPromises = uriHashes.map(uriHash => getIPFSJson(uriHash) as Promise<PoapMetadata>)
    const poapUris = await Promise.all(metadataPromises)

    // Create the list of Poaps
    for (let i = 0; i < poaps.length; i++) {
        addressPoap.push({
            tokenId: poaps[i],
            timestamp: timestamps[i],
            uri: uriHashes[i],
            metadata: poapUris[i]
        })
    }

    return <>
        <UserProfile address={params.address} poaps={addressPoap} />
        <Footer />
    </>
}
