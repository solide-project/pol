import { Poap, PoapMetadata } from "@/lib/poap";
import { POLPoapContract } from "@/lib/poap/contract";
import { retrieve } from "@/lib/util/ipfs";
import { PoapItemCard } from "@/components/core/home/poap/item-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PoapMintedCard } from "@/components/core/home/poap/minted-card";
import { TransferLogData } from "@/lib/poap/interface";

export default async function Page() {
    const size = 10;
    const page = 1;

    // get all token ids, given a page and size, starting from 0
    const start = (page - 1) * size;
    const tokenIds: number[] = Array.from(
        { length: size },
        (_, i) => start + i,
    );

    const poapContract = new POLPoapContract({});

    const uriPromises = tokenIds.map((poap) =>
        poapContract.uri(poap.toString()),
    );
    const uriHashes = await Promise.all(uriPromises);

    const tokenPoapsUris = tokenIds
        .map((tokenId, index) => ({
            tokenId,
            uriHash: uriHashes[index],
        }))
        .filter((poap) => poap.uriHash !== "");

    // Batch collect all Poap metadata from IPFS
    const metadataPromises = tokenPoapsUris.map(
        (poap) => retrieve(poap.uriHash) as Promise<PoapMetadata>,
    );
    const poapUris = await Promise.all(metadataPromises);

    const totalSupplyPromises = tokenPoapsUris.map((poap) =>
        poapContract.totalSupply(poap.tokenId.toString()),
    );
    const totalSupplies = await Promise.all(totalSupplyPromises);

    const poaps = tokenPoapsUris.map((item, index) => ({
        tokenId: item.tokenId,
        metadata: poapUris[index],
        supply: totalSupplies[index],
        uri: item.uriHash
    }));

    // Assume that the number of Poaps is less than the size then its the last page
    const isLastPage = poapUris.length < size;

    const transfers = await poapContract.getAllTransfers(3);
    const verificationPromises = transfers.map((log) =>
        poapContract.getVerification(
            log.args.from as `0x${string}`,
            Number(log.args.id),
        ),
    );
    const verificationsUris = await Promise.all(verificationPromises);
    const logs: { log: TransferLogData; poap: Poap }[] = transfers.map(
        (log, i) => {
            const metadata = poapUris[Number(log.args.id)];

            return {
                log,
                poap: {
                    tokenId: log.args.id,
                    timestamp: log.blockNumber,
                    uri: "",
                    metadata: metadata,
                    verification: verificationsUris[i],
                } as Poap,
            };
        },
    );

    return (
        <div className="mt-8">
            <div className="text-center my-8">
                <div className="text-4xl leading-[1.1] font-bold mb-3">
                    Proof of Learn Gallery
                </div>
                <div>
                    Start learning from official protocol resources and earn a POAP!
                </div>
            </div>

            <div className="container my-12">
                <div className="font-semibold text-lg my-4">
                    Recent Activity
                </div>
                <div className="grid grid-cols-12 gap-4">
                    {logs.map(({ poap, log }, index) => (
                        <div
                            key={index}
                            className="col-span-12 md:col-span-3 flex items-center"
                        >
                            <PoapMintedCard poap={poap} event={log} />
                        </div>
                    ))}
                    {/* <div className="col-span-12 md:col-span-3 flex items-center">
                        <Button>
                            <div>View More</div>
                            <ArrowRight />
                        </Button>
                    </div> */}
                </div>
            </div>

            <div className="container my-8">
                <div className="grid grid-cols-12 gap-4">
                    {poaps.map(({ tokenId, metadata: poap, supply, uri }, index) => {
                        return (
                            <div
                                key={index}
                                className="col-span-12 md:col-span-4"
                            >
                                <PoapItemCard
                                    key={index}
                                    tokenId={tokenId}
                                    poap={poap}
                                    supply={supply}
                                    uri={uri}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
