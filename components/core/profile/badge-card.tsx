"use client";

import { Button, buttonVariants } from "@/components/ui/button"
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
import { ipfsGateway } from "@/lib/util/ipfs"
import { useOCAuth } from "@opencampus/ocid-connect-js";
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useAccount } from "wagmi";
import { Icons } from "../shared/icons";

interface BadgeCardProps extends React.HTMLAttributes<HTMLDivElement> {
    poap: Poap
}

export function BadgeCard({ poap }: BadgeCardProps) {
    const router = useRouter()
    const params = useParams<{ address: string }>()
    const { address } = useAccount()
    const { authState, ocAuth, updateAuthState } = useOCAuth();

    const [isRedirecting, setIsRedirecting] = useState(false)
    const [canRedirect, setCanDirect] = useState(true)

    const generateTweet = (title: string) => {
        const uri = "https://twitter.com/intent/tweet"
        const text = `I completed the ${title} on Proof of Learn and earn a Poap!`
        const url = `https://opencampus-codex.blockscout.com/token/0x9B6089b63BEb5812c388Df6cb3419490b4DF4d54/instance/${poap.tokenId.toString()}`
        return `${uri}?text=${text}&url=${url}`
    }

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
            <Details text="Token ID" value={poap.tokenId.toString()} />
            {poap.timestamp &&
                <Details text="Earned on" value={new Date(Number(poap.timestamp) * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />}
            <Details text="Metadata" value={poap.uri.toString()} />
            <DialogFooter className="flex gap-2">
                {canRedirect && <Button onClick={redirectToQuest}>
                    {isRedirecting ? "Loading ..." : "Start Learning"}
                </Button>}
                {authState.isAuthenticated && ocAuth?.getAuthInfo()?.eth_address === params.address &&
                    <a className={`${buttonVariants({ variant: "outline" })} flex items-center gap-2`}
                        target="_blank" rel="noopener noreferrer"
                        href={generateTweet(poap.metadata.name)}>
                        <div>Share</div>
                        <Icons.x className="h-4 w-4" />
                    </a>}
            </DialogFooter>
        </DialogContent>
    </Dialog>
}


const Details = ({ text, value }: { text: string, value: string }) => {
    return <div className="flex gap-x-1 text-sm">
        <div className="w-48 text-gray-400">{text}</div>
        <div className="break-all flex-1 leading-5 flex items-center gap-1">
            <div>{value}</div>
        </div>
    </div>
}
