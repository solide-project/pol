"use client";

import { Poap, selectedNetwork } from "@/lib/poap";
import { ipfsGateway } from "@/lib/util/ipfs";
import { getExplorer, getTransactionExplorer } from "@/lib/chains";
import { TransferLogData } from "@/lib/poap/interface";
import Image from "next/image";
import Link from "next/link";
import { getIconByChainId } from "@/lib/chains/evm/icon";
import { epochToDaysAgo, mask } from "@/lib/quest";

interface PoapCardProps {
    poap: Poap;
    event: TransferLogData;
}

export function PoapMintedCard({ poap, event }: PoapCardProps) {
    const chainId = selectedNetwork.id.toString();

    return (
        <figcaption className="flex items-center">
            <Image
                src={`${poap.metadata.image.replace("ipfs://", ipfsGateway)}`}
                alt="badge"
                width={64}
                height={64}
                className="w-15 h-15 shrink-0"
            />

            <div className="space-y-0.5 dark:text-white text-left rtl:text-right ms-3">
                <div className="text-grayscale-250 text-sm">
                    {epochToDaysAgo(event.timestamp)}
                </div>
                <div className="flex font-medium">
                    <Link
                        href={`${getExplorer(chainId)}/address/${event.args.to}`}
                        target="_blank"
                    >
                        {mask(event.args.to || "0x")} completed #{poap.tokenId.toString()}
                    </Link>
                </div>
                <div className="flex items-center text-sm space-x-2">
                    <img
                        src={getIconByChainId(chainId)}
                        alt="chain"
                        className="h-5 w-5 shrink-0"
                    />
                    <Link
                        href={getTransactionExplorer(
                            chainId,
                            event.transactonHash,
                        )}
                        target="_blank"
                    >
                        EDU Chain
                    </Link>
                </div>
            </div>
        </figcaption>
    );
}
