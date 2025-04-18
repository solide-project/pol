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
import { fetchSubmission, fetchUserSubmission, SubmissionResponse, UserSubmissionResponse } from "@/lib/util/mongo-service";
import { Input } from "@/components/ui/input";
import toast from 'react-hot-toast';
import { Pickaxe } from "lucide-react";
import confetti from "canvas-confetti";
import { useWallet } from "@/components/core/wallet/wallet-provider";
import { generateDataHash } from "@/lib/polearn/core";
import { Checkbox } from "@/components/ui/checkbox";

interface SubmissionButtonProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function SubmissionButton({ className }: SubmissionButtonProps) {
    const { selectedQuest } = useQuest()
    const wallet = useWallet()

    const [submissionResponse, setSubmissionResponse] = useState<SubmissionResponse>({} as SubmissionResponse)
    const [userSubmissionResponse, setUserSubmissionResponse] = useState<UserSubmissionResponse>({} as UserSubmissionResponse)
    const [open, setOpen] = useState(false);

    const [data, setData] = useState<string>("")
    const [nonTransaction, setNonTransaction] = useState(false)

    // We can cache the response for submission as we will be getting from API every time
    useEffect(() => {
        (async () => {
            // Only fetch if connected wallet and selected quest
            setUserSubmissionResponse({} as UserSubmissionResponse)
            setSubmissionResponse({} as SubmissionResponse)
            setJustSubmitted(false)

            if (!await wallet.isConnected()) return;
            const address = await wallet.getAccount()

            if (!address) return
            if (selectedQuest?.name.id === undefined) return

            try {
                const userSubmission = await fetchUserSubmission(selectedQuest?.name.id, address)
                if (userSubmission) {
                    // console.log("User already submitted", userSubmission)
                    setUserSubmissionResponse(userSubmission)
                    return
                }

                setSubmissionResponse({} as SubmissionResponse)
                const submission = await fetchSubmission(selectedQuest?.name.id)
                setSubmissionResponse(submission)
            } catch (error: any) {
                console.error(error)
            }
        })()
    }, [selectedQuest, wallet.walletProvider])

    const generateBody = () => {
        if (nonTransaction || !data.startsWith("0x")) {
            return generateDataHash(data) as `0x${string}`
        }

        return data as `0x${string}`
    }

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [justSubmitted, setJustSubmitted] = useState(false)
    const handleSubmission = async () => {
        if (selectedQuest?.name.id === undefined) {
            toast.error("Couldn't find the quest. How did you get here?")
            return
        }

        if (!data) {
            toast.error("Please enter a transaction hash")
            return
        }

        setIsSubmitting(true)
        try {
            const address = await wallet.getAccount()
            if (!address) {
                toast.error("Couldn't found account")
                return
            }

            const response = await fetch("/api/db/submission/submit", {
                method: "POST",
                body: JSON.stringify({ id: selectedQuest?.name.id, payload: generateBody(), address }),
            })

            if (!response.ok) {
                const { message } = await response.json()
                toast.error(message)
                return
            }

            const result = await response.json()
            console.log(result)

            triggerConfetti()
            triggerConfetti()
            triggerConfetti()
            setOpen(false)
            setJustSubmitted(true)
            toast.success("Completed")
        } catch (error: any) {
            console.error(error)
            toast.error(error.message)
        } finally {
            setIsSubmitting(false)
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

    if (!wallet.walletProvider)
        return <Button disabled={true} size="sm" variant="ghost">Connect Wallet to Submit Quest</Button>

    if (userSubmissionResponse.result?.completed || justSubmitted) return <Button disabled={true} size="sm" variant="ghost">Quest Completed 🎉</Button>
    if (!submissionResponse.result) return <></>

    return <>
        {submissionResponse && <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={buttonVariants({ variant: "default" })}>
                <div className="hidden md:block">Submit Quest</div>
                <Pickaxe />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter the transaction hash for validate the deployment and contract execution</DialogTitle>
                    <DialogDescription>
                        <Input placeholder={submissionResponse?.result.type}
                            onChange={(e) => setData(e.target.value)} value={data} />

                        <div className="flex items-center gap-2 my-2">
                            <div>Non Transaction</div>
                            <Checkbox checked={nonTransaction}
                                onCheckedChange={(e) => setNonTransaction(!nonTransaction)} />
                        </div>
                    </DialogDescription>
                </DialogHeader>

                <Button onClick={handleSubmission} disabled={isSubmitting}>
                    {!isSubmitting
                        ? <>
                            <div className="hidden md:block">Submit Quest</div>
                            <Pickaxe />
                        </>
                        : <div>Validating...</div>}
                </Button>
            </DialogContent>
        </Dialog >
        }
    </>
}