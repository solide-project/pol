"use client";

import { getContractAddress, Poap, PoapMetadata, selectedNetwork } from "@/lib/poap";
import { ipfsGateway } from "@/lib/util/ipfs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Award } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Course } from "@/lib/db/course";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getExplorer } from "@/lib/chains";
import { GridPattern } from "../home/poap/shared/grid-pattern";
import { VerificationDialog } from "./verification/dialog";
import { CourseDialog } from "./course-dialog";

interface PoapUserCardProps {
    poap: Poap;
}

export function PoapUserCard({
    poap
}: PoapUserCardProps) {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    const redirectToQuest = async (tokenId: number) => {
        setIsRedirecting(true);
        const response = await fetch(`/api/db/quest/${tokenId.toString()}`);

        if (!response.ok) {
            console.error("Failed to fetch", response.statusText);
            return;
        }

        const data = await response.json();

        const quest: Course = data.result;

        router.push(`/q/${quest.owner}/${quest.name}`);
        setIsRedirecting(false);
    };

    return (
        <div className="bg-grayscale-025 cursor-pointer rounded-lg p-4 group">
            <div className="relative flex flex-col items-center justify-center space-y-4 bg-grayscale-000 rounded-lg p-4 z-[10]">
                <Image
                    className="object-cover transition-all group-hover:scale-110"
                    src={`${poap.metadata.image.replace("ipfs://", ipfsGateway)}`}
                    alt="badge"
                    width={160}
                    height={160}
                />

                <GridPattern />
            </div>

            <div className="flex flex-col my-4">
                <div className="flex items-center justify-between">
                    <div className="text-grayscale-150">
                        #{poap.tokenId.toString()}
                    </div>
                </div>

                <div className="font-semibold my-2">{poap.metadata.name}</div>

                <div className="flex items-center justify-center gap-2">
                    <VerificationDialog poap={poap} />
                    <CourseDialog poap={poap} />
                </div>
            </div>
        </div>
    );
}
