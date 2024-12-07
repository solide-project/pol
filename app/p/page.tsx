import { PoapMetadata } from "@/lib/poap";
import { POLPoapContract } from "@/lib/poap/contract"
import { retrieve } from "@/lib/util/ipfs";
import { PoapItem } from "@/components/core/home/poap-item";

export default async function Page() {
    const size = 10
    const page = 1

    // get all token ids, given a page and size, starting from 0
    const start = (page - 1) * size;
    const tokenIds: number[] = Array.from({ length: size }, (_, i) => start + i);

    const poapContract = new POLPoapContract({})

    const uriPromises = tokenIds.map(poap => poapContract.uri(poap.toString()))
    const uriHashes = await Promise.all(uriPromises)

    const tokenPoapsUris = tokenIds
        .map((tokenId, index) => ({
            tokenId,
            uriHash: uriHashes[index],
        }))
        .filter(poap => poap.uriHash !== "");

    // Batch collect all Poap metadata from IPFS
    const metadataPromises = tokenPoapsUris
        .map(poap => retrieve(poap.uriHash) as Promise<PoapMetadata>)
    const poapUris = await Promise.all(metadataPromises)

    const totalSupplyPromises = tokenPoapsUris.map(poap => poapContract.totalSupply(poap.tokenId.toString()))
    const totalSupplies = await Promise.all(totalSupplyPromises)

    const poaps = tokenPoapsUris
        .map((item, index) => ({
            tokenId: item.tokenId,
            metadata: poapUris[index],
            supply: totalSupplies[index]
        }))

    // console.log(poaps)

    // Assume that the number of Poaps is less than the size then its the last page
    const isLastPage = poapUris.length < size

    return <div className="mt-8">
        <div className="text-center my-8">
            <div className="text-xl leading-[1.1] sm:text-2xl md:text-4xl font-bold mb-3">
                Proof of Learn POAPs
            </div>
            <div>Starting Learning from official protocols resource to earn a POAP!</div>
        </div>
        <div className="grid grid-cols-12 gap-4">
            {poaps.map(({ tokenId, metadata: poap, supply }, index) => {
                return <PoapItem key={index} tokenId={tokenId} poap={poap} supply={supply}
                    className="col-span-12 md:col-span-4" />
            })}
        </div>
    </div>
}
