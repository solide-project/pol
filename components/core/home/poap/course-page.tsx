"use client";

import { getContractAddress, PoapMetadata, selectedNetwork } from "@/lib/poap";
import { ipfsGateway } from "@/lib/util/ipfs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getExplorer } from "@/lib/chains";
import Link from "next/link";
import { Database, ExternalLink, Medal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Course } from "@/lib/db/course";

interface CoursePageProps {
    tokenId: number;
    poap: PoapMetadata;
    supply?: BigInt;
    uri: string;
    displayStartLearning?: boolean
}

export function CoursePage({ tokenId, poap, supply, uri, displayStartLearning = true }: CoursePageProps) {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    const redirectToQuest = async () => {
        setIsRedirecting(true);

        const response = await fetch(
            `/api/db/quest/${tokenId.toString()}`,
        );

        if (!response.ok) {
            console.error("Failed to fetch", response.statusText);
            setIsRedirecting(false);
            return;
        }

        const data = await response.json();

        const quest: Course = data.result;

        router.push(`/q/${quest.owner}/${quest.name}`);
        setIsRedirecting(false);
    };

    return (
        <div className="flex flex-col md:flex-row rounded-lg">
            <div className="order-first">
                <div className="flex items-center justify-center bg-primary py-2 sm:py-16 rounded-lg min-w-[360px]">
                    <Image
                        className="h-[196px] w-[196px] sm:h-[256px] sm:w-[256px]"
                        src={`${poap.image.replace("ipfs://", ipfsGateway)}`}
                        alt="badge"
                        width={256}
                        height={256}
                    />
                </div>
            </div>
            <div className="container my-8 md:my-0">
                <div className="flex gap-4">
                    <div className="border-r border-gray-300 pr-4">
                        POAP ID #{tokenId.toString()}
                    </div>
                    <Link
                        className="flex items-center border-r border-gray-300 pr-4"
                        href={`${getExplorer(selectedNetwork.id.toString())}/token/${getContractAddress(selectedNetwork.id.toString())}/instance/${tokenId.toString()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View on Explorer&nbsp;
                        <ExternalLink size={16} />
                    </Link>
                </div>

                <div className="font-bold text-2xl my-4">{poap.name}</div>

                <p className="text-sm text-muted-foreground">
                    {poap.description}
                </p>

                <div className="flex items-center gap-4 my-2">
                    {supply && <div className="flex items-center space-x-2">
                        <Medal />
                        <div>{supply.toString()}</div>
                    </div>}
                    <div className="flex items-center space-x-2">
                        <Link
                            className="flex items-center"
                            href={uri.replace(
                                "ipfs://",
                                "https://ipfs.io/ipfs/",
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Database />
                            <div>
                                {uri.replace("ipfs://", "").slice(0, 8)}...
                            </div>
                            <ExternalLink size={16} />
                        </Link>
                    </div>
                    {displayStartLearning &&
                        <Button onClick={redirectToQuest}>{"Start Learning"}</Button>}
                </div>
            </div>
        </div>
    );
}
