"use client"

import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useQuest } from "@/components/providers/quest-provider";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Award } from "lucide-react";
import { POLPoapContract } from "@/lib/poap";
import toast from "react-hot-toast";

import { createWalletClient, custom } from 'viem'
import confetti from "canvas-confetti";

const getWallet = async () => {
    const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts'
    })

    return createWalletClient({
        account,
        transport: custom(window.ethereum!)
    })
}

interface MintingQuestProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function MintingQuest({ className }: MintingQuestProps) {
    const { questPoap } = useQuest()

    const [metadata, setMetadata] = useState("")
    const [open, setOpen] = useState(false);

    useEffect(() => {
        (async () => {
            if (questPoap) {
                const contract = new POLPoapContract({})
                const metadata = await contract.uri(questPoap.tokenId.toString())

                console.log(metadata)
                setMetadata(metadata)
            }
        })()
    }, [questPoap])

    const [isMinting, setIsMinting] = useState(false)
    const handleMinting = async () => {
        console.log("Minting")
        setIsMinting(true)

        try {
            if (!questPoap) {
                return;
            }

            // Sign message
            const [account] = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })

            const client = createWalletClient({
                account,
                transport: custom(window.ethereum!)
            })
            const signature = await client.signMessage({
                account,
                message: "0x9B6089b63BEb5812c388Df6cb3419490b4DF4d54",
            })

            console.log(signature, account)
            const response = await fetch("/api/mint", {
                method: "POST",
                body: JSON.stringify({
                    owner: questPoap.owner, name: questPoap.name,
                    signature: signature, address: account
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                toast.error(result.message)
                return
            }

            triggerConfetti()
            triggerConfetti()
            triggerConfetti()

            // setOpen(false)
            toast.success("Poap minted successfully")
        } catch (e) {
            console.error(e)
        } finally {
            setIsMinting(false)
        }
    }


    const triggerConfetti = () => {
        const defaults = {
            spread: 360,
            ticks: 50,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
            colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
        };

        const shoot = () => {
            confetti({
                ...defaults,
                particleCount: 40,
                scalar: 1.2,
                shapes: ["star"],
            });

            confetti({
                ...defaults,
                particleCount: 10,
                scalar: 0.75,
                shapes: ["circle"],
            });
        };

        setTimeout(shoot, 0);
        setTimeout(shoot, 100);
        setTimeout(shoot, 200);
    };

    return <>
        {questPoap !== undefined && <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={buttonVariants({ variant: "default" })}>
                <div className="hidden md:block">Poap</div>
                <Award />
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Complete all the quests for this resource?</DialogTitle>
                <DialogDescription>
                    Earn yourself a POL Poap for completing all the quests in this resource.
                </DialogDescription>
                <div>
                    {/* {JSON.stringify(questPoap)} */}
                    {metadata}
                </div>
                <Button onClick={handleMinting} disabled={isMinting}>
                    {!isMinting
                        ? <>
                            <div className="hidden md:block">Mint POL Poap</div>
                            <Award />
                        </>
                        : <div>Minting...</div>}
                </Button>
            </DialogContent>
        </Dialog>}
    </>
}