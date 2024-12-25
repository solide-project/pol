import { Profile, UserProfileData } from "@/components/core/profile";
import { Footer } from "@/components/core/shared/footer";
import { NotFoundProps } from "@/components/core/shared/not-found";
import { POLPoapContract } from "@/lib/poap/contract";
import { Poap, PoapMetadata } from "@/lib/poap/interface";
import { retrieve } from "@/lib/util/ipfs";
import { isAddress } from "viem";

interface SearchParams {
    params: { address: string }
}

export default async function Page({ params }: SearchParams) {
    if (!isAddress(params.address)) {
        return <NotFoundProps />
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
    const metadataPromises = uriHashes.map(uriHash => retrieve(uriHash) as Promise<PoapMetadata>)
    const poapUris = await Promise.all(metadataPromises)

    // Get all Verification from tokens. Might not be worth to get all, but for now it's ok
    const verificationPromises = poaps.map(poap => poapContract.getVerification(params.address as `0x${string}`, Number(poap)))
    const verificationsUris = await Promise.all(verificationPromises)

    // Create the list of Poaps
    for (let i = 0; i < poaps.length; i++) {
        addressPoap.push({
            tokenId: poaps[i],
            timestamp: timestamps[i],
            uri: uriHashes[i],
            metadata: poapUris[i],
            verification: verificationsUris[i]
        })
    }

    const data: UserProfileData = {
        total: poaps.length || 0
    }

    return <>
        <Profile address={params.address} poaps={addressPoap} data={data} />
        <Footer />
    </>
}
