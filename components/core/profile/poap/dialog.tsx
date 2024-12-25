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
import { Course } from "@/lib/db/course"
import { Poap } from "@/lib/poap"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useWallet } from "@/lib/wallet/src";
import { PoapContent } from "./content";
import { PoapShareButton } from "./button-share";
import { IPFSImage } from "../../shared/ipfs-image";

interface PoapDialogProps extends React.HTMLAttributes<HTMLDivElement> {
    poap: Poap
}

export function PoapDialog({ poap }: PoapDialogProps) {
    const router = useRouter()
    const params = useParams<{ address: string }>()
    const wallet = useWallet()

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

        const quest: Course = data.result

        router.push(`/q/${quest.owner}/${quest.name}`)
        setIsRedirecting(false)
    }

    return <Dialog>
        <DialogTrigger asChild>
            <div className="flex items-center justify-center">
                <div>
                    <IPFSImage src={poap.metadata.image as any} alt="badge" width={245} height={245}
                        className="transform transition duration-500 hover:scale-110" />
                    <div className="flex items-center justify-center my-2">
                        <Button variant="outline">{JSON.stringify(poap.metadata.name)}</Button>
                    </div>
                </div>
            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{poap.metadata.name}</DialogTitle>
            </DialogHeader>

            <PoapContent poap={poap} />

            <DialogFooter className="flex gap-2">
                {canRedirect && <Button className="w-full" onClick={redirectToQuest}>
                    {isRedirecting ? "Loading ..." : "Start Learning"}
                </Button>}
                {wallet.walletProvider && wallet.selectedAccount === params.address &&
                    <PoapShareButton poap={poap} />}
            </DialogFooter>
        </DialogContent>
    </Dialog>
}