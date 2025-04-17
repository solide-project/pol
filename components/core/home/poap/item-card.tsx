"use client";

import { PoapMetadata } from "@/lib/poap";
import { ipfsGateway } from "@/lib/util/ipfs";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { Course } from "@/lib/db/course";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CourseCardTag } from "./shared/tag";
import { GridPattern } from "./shared/grid-pattern";
import { CoursePage } from "./course-page";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface PoapItemCardProps {
    tokenId: number;
    poap: PoapMetadata;
    supply?: BigInt;
    uri: string;
}

export function PoapItemCard({
    tokenId,
    poap,
    supply,
    uri
}: PoapItemCardProps) {
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
                    src={`${poap.image.replace("ipfs://", ipfsGateway)}`}
                    alt="badge"
                    width={160}
                    height={160}
                />

                <GridPattern />
            </div>

            <div className="flex flex-col my-4">
                <div className="flex items-center justify-between">
                    <div className="text-grayscale-150">
                        #{tokenId.toString()}
                    </div>
                    {supply && <CourseCardTag>{supply.toString()} Learners</CourseCardTag>}
                </div>

                <div className="font-semibold my-2">{poap.name}</div>

                <Dialog>
                    <DialogTrigger
                        className={buttonVariants({ variant: "ghost" })}
                    >
                        Take a Look
                    </DialogTrigger>
                    <DialogContent aria-describedby={undefined}>
                        <VisuallyHidden>
                            <DialogHeader>
                                <DialogTitle></DialogTitle>
                            </DialogHeader>
                        </VisuallyHidden>

                        <CoursePage
                            tokenId={tokenId}
                            poap={poap}
                            supply={supply}
                            uri={uri}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
