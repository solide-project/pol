"use client"

import React, { useEffect } from "react";
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
import { fetchSubmission, fetchUserSubmission, SubmissionResponse, UserSubmissionResponse } from "@/lib/db/mongo-service";
import { Input } from "@/components/ui/input";
import { useAccount } from "wagmi";
import toast from 'react-hot-toast';
import { Pickaxe } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmissionButtonProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function SubmissionButton({ className }: SubmissionButtonProps) {
    const { selectedQuest } = useQuest()
    const [submissionResponse, setSubmissionResponse] = React.useState<SubmissionResponse>({} as SubmissionResponse)
    const [userSubmissionResponse, setUserSubmissionResponse] = React.useState<UserSubmissionResponse>({} as UserSubmissionResponse)
    const { address } = useAccount()

    const [data, setData] = React.useState<string>("0x2776655a8d810840286d75abfae2c083107bdc1978712ec0c8cb4aadcbc6968c")

    useEffect(() => {
        (async () => {
            // Only fetch if connected wallet and selected quest
            if (!address) return
            if (selectedQuest?.name.id === undefined) return
            try {
                setSubmissionResponse({} as SubmissionResponse)
                const submission = await fetchSubmission(selectedQuest?.name.id)
                setSubmissionResponse(submission)

                const userSubmission = await fetchUserSubmission(selectedQuest?.name.id, address)
                setUserSubmissionResponse(userSubmission)
                console.log(userSubmission)
            } catch (error: any) {
                console.error(error)
            }
        })()
    }, [selectedQuest, address])

    const handleSubmission = async () => {
        console.log("Submission", selectedQuest?.name.id)
        if (selectedQuest?.name.id === undefined) return
        // const submission = getSubmission(selectedQuest?.name.id)

        const response = await fetch("/api/db/submission/submit", {
            method: "POST",
            body: JSON.stringify({ id: selectedQuest?.name.id, payload: data, address }),
        })

        if (!response.ok) {
            const { message } = await response.json()
            toast.error(message)
            return
        }

        const result = await response.json()

        console.log(result)
    }

    if (!address) return <Button disabled={true} size="sm" variant="ghost">Connect Wallet to Submit Quest</Button>
    if (!submissionResponse.result) return <></>

    if (userSubmissionResponse.result?.completed) return <Button disabled={true} size="sm" variant="ghost">Quest Completed 🎉</Button>
    return <Dialog>
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
                </DialogDescription>
            </DialogHeader>

            <Button onClick={handleSubmission}>
                <div className="hidden md:block">Submit Quest</div>
                <Pickaxe />
            </Button>
        </DialogContent>
    </Dialog>
}