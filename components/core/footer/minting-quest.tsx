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
import { PoapMetadata, POLPoapContract } from "@/lib/poap";
import toast from "react-hot-toast";
import Image from 'next/image';
import { createWalletClient, custom } from 'viem'
import confetti from "canvas-confetti";
import { getIPFSJson, ipfsGateway } from "@/lib/util/ipfs";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { selectedNetwork } from "@/lib/poap/chain";

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
    const { ocAuth, authState } = useOCAuth();

    const [metadata, setMetadata] = useState("")
    const [poapMetadata, setPoapMetadata] = useState<PoapMetadata | undefined>()

    const [open, setOpen] = useState(false);

    useEffect(() => {
        (async () => {
            if (questPoap) {
                const contract = new POLPoapContract({})
                const metadata = await contract.uri(questPoap.tokenId.toString())
                setHasMinted(0)
                
                if (!metadata) {
                    toast.error("Error getting metadata for POAP")
                    return;
                }

                const data: PoapMetadata = await getIPFSJson(metadata)
                setPoapMetadata(data)
                setMetadata(metadata)

                if (authState.isAuthenticated) {
                    const address = ocAuth?.getAuthInfo()?.eth_address
                    const timeStamp = await contract.mintTracker(questPoap.tokenId.toString(), address)
                    if (timeStamp !== BigInt(0)) {
                        setHasMinted(Number(timeStamp) * 1000)
                    }
                }
            }
        })()
    }, [questPoap])

    const [isMinting, setIsMinting] = useState("")
    const [hasMinted, setHasMinted] = useState(0)
    const handleMinting = async () => {
        console.log("Minting")
        setIsMinting("Validating ...")

        try {
            if (!questPoap) {
                return;
            }

            if (!authState.isAuthenticated) {
                toast.error("Not logged to OCID")
            }

            const address = ocAuth.getAuthInfo().eth_address

            const response = await fetch("/api/mint-v2", {
                method: "POST",
                body: JSON.stringify({
                    owner: questPoap.owner, name: questPoap.name,
                    address,
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                toast.error(result.message)
                return
            }

            console.log(result)
            if (!result.signature) {
                toast.error("API Error, please contact the PoL team")
                return
            }

            if (!result.verificationHash) {
                toast.error("Verification, please contact the PoL team")
                return
            }

            const [account] = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })

            const client = createWalletClient({
                account,
                chain: selectedNetwork,
                transport: custom(window.ethereum!)
            })

            await client.switchChain({ id: selectedNetwork.id }) 

            setIsMinting("Minting ...")

            const poapContract = new POLPoapContract({ client })
            const hash = await poapContract.mint(address, result.tokenId, "0x", result.verificationHash, result.signature)

            triggerConfetti()
            triggerConfetti()
            triggerConfetti()

            // setOpen(false)
            console.log("transactionHash", hash)
            toast.success(`Poap minted successfully. Hash ${hash}`)

            setHasMinted(Date.now())
        } catch (e) {
            console.error(e)
        } finally {
            setIsMinting("")
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
                {hasMinted ? <VisuallyHidden>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                </VisuallyHidden>
                    : <>
                        <DialogTitle>Complete all the quests for this resource?</DialogTitle>
                        <DialogDescription>
                            Earn yourself a POL Poap for completing all the quests in this resource.
                        </DialogDescription>
                    </>}
                <div>
                    {/* {questPoap.tokenId}
                    {metadata} */}
                    {poapMetadata && <>
                        <div className="text-2xl font-extrabold text-center">{poapMetadata.name}</div>
                        <div className="my-2">{poapMetadata.description}</div>
                        <div className="flex items-center justify-center">
                            <Image src={`${poapMetadata.image.replace("ipfs://", ipfsGateway)}`} alt="badge"
                                width={245} height={245} />
                        </div>
                    </>}
                </div>
                {hasMinted
                    ? <Button disabled={true}>Congratz! You completed this course {new Date(hasMinted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} </Button>
                    : <Button onClick={handleMinting} disabled={!!isMinting} className="my-2">
                        {!isMinting
                            ? <>
                                <div className="hidden md:block">Mint POL Poap</div>
                                <Award />
                            </>
                            : <div>{isMinting ? isMinting : ""}</div>}
                    </Button>}
            </DialogContent>
        </Dialog>}
    </>
}