"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { QuestSchema } from "@/lib/db/quest"
import { Poap } from "@/lib/poap"
import { ipfsGateway } from "@/lib/poap/ipfs"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface BadgeCardProps extends React.HTMLAttributes<HTMLDivElement> {
    poap: Poap
}

export function BadgeCard({ poap }: BadgeCardProps) {
    const router = useRouter()

    const [isRedirecting, setIsRedirecting] = useState(false)
    const [canRedirect, setCanDirect] = useState(true)

    const redirectToQuest = async () => {
        setIsRedirecting(true)

        const response = await fetch(`/api/db/quest/${poap.tokenId.toString()}`)

        if (!response.ok) {
            console.error("Failed to fetch", response.statusText)
            setIsRedirecting(false)
            setCanDirect(false)
            return
        }

        const data = await response.json()

        const quest: QuestSchema = data.result
        console.log(quest)

        router.push(`/q/${quest.owner}/${quest.name}`)
        setIsRedirecting(false)
    }

    return <Dialog>
        <DialogTrigger asChild>
            <div className="flex items-center justify-center">
                <div>
                    <Image src={`${poap.metadata.image.replace("ipfs://", ipfsGateway)}`} alt="badge" width={245} height={245}
                        className="transform transition duration-500 hover:scale-110" />
                    <div className="flex items-center justify-center my-2">
                        <Button variant="outline">{JSON.stringify(poap.metadata.name)}</Button>
                    </div>
                </div>
            </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>POL POAP: {poap.metadata.name}</DialogTitle>
            </DialogHeader>
            <Details text="Earned on" value={poap.timestamp.toString() || "0"} />
            <DialogFooter>
                {canRedirect && <Button onClick={redirectToQuest}>
                    {isRedirecting ? "Loading ..." : "Start Learning"}
                </Button>}
            </DialogFooter>
        </DialogContent>
    </Dialog>
}


const Details = ({ text, value }: { text: string, value: string }) => {
    return <div className="flex px-5 py-1 gap-x-1 text-sm">
        <div className="w-48 text-gray-400">{text}</div>
        <div className="break-all flex-1 leading-5 flex items-center gap-1">
            <div>{value}</div>
        </div>
    </div>
}