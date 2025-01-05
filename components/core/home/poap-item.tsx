"use client"

import { getContractAddress, PoapMetadata, selectedNetwork } from "@/lib/poap";
import { ipfsGateway } from "@/lib/util/ipfs";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Award } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from 'next/image';
import { Course } from "@/lib/db/course";
import { useRouter } from "next/navigation"
import { useState } from "react";
import { getExplorer } from "@/lib/chains";

interface PoapItemProps extends React.HTMLAttributes<HTMLDivElement> {
    tokenId: number
    poap: PoapMetadata
    supply: BigInt
}

export function PoapItem({ tokenId, poap, supply, className }: PoapItemProps) {
    const router = useRouter()
    const [isRedirecting, setIsRedirecting] = useState(false)

    const redirectToQuest = async (tokenId: number) => {
        setIsRedirecting(true)
        const response = await fetch(`/api/db/quest/${tokenId.toString()}`)

        if (!response.ok) {
            console.error("Failed to fetch", response.statusText)
            return
        }

        const data = await response.json()

        const quest: Course = data.result

        router.push(`/q/${quest.owner}/${quest.name}`)
        setIsRedirecting(false)
    }


    return <div className={className}>
        <div className="flex items-center justify-center">
            <Image src={`${poap.image.replace("ipfs://", ipfsGateway)}`} alt="badge"
                width={245} height={245} />
        </div>

        <div className="flex items-center justify-center flex-col">
            <div className="text-2xl font-extrabold text-center my-4">{poap.name}</div>
            <Dialog>
                <DialogTrigger className={buttonVariants({ variant: "default" })}>
                    <div className="hidden md:block">Poap {tokenId.toString()}</div>
                    <Award />
                </DialogTrigger>
                <DialogContent>
                    <div>
                        {poap && <>
                            <div className="text-2xl font-extrabold text-center">{poap.name}</div>
                            <div className="my-2">{poap.description}</div>
                            <div className="flex items-center justify-center">
                                <Image src={`${poap.image.replace("ipfs://", ipfsGateway)}`} alt="badge"
                                    width={245} height={245} />
                            </div>
                        </>}
                    </div>

                    <div className="text-center">
                        {supply.toString()} students have earned this Poap
                    </div>

                    <a href={`${getExplorer(selectedNetwork.id.toString())}/token/${getContractAddress(selectedNetwork.id.toString())}/instance/${tokenId.toString()}`}
                        target="_blank" rel="noopener noreferrer"
                        className={buttonVariants({ variant: "default" })}>
                        View on Explorer
                    </a>
                    <Button onClick={() => redirectToQuest(tokenId)}>
                        {isRedirecting ? "Redirecting ..." : "Start Learning"}
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    </div>
}