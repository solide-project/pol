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
import { Award } from "lucide-react";

interface MintingQuestProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function MintingQuest({ className }: MintingQuestProps) {
    const { questPoap } = useQuest()

    useEffect(() => {
        if (questPoap) {

        }
    }, [questPoap])

    const handleMinting = async () => {
        console.log("Minting")
        if (!questPoap) {
            return;

        }
        const response = await fetch("/api/mint", {
            method: "POST",
            body: JSON.stringify({ owner: questPoap.owner, name: questPoap.name }),
        })

        const result = await response.json()
        console.log(result)
    }

    return <>
        {questPoap !== undefined && <Dialog>
            <DialogTrigger className={buttonVariants({ variant: "default" })}>
                <div className="hidden md:block">Poap</div>
                <Award />
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <div>
                    {JSON.stringify(questPoap)}
                </div>
                <Button onClick={handleMinting}>
                    <div className="hidden md:block">Poap</div>
                    <Award />
                </Button>
            </DialogContent>
        </Dialog>}
    </>
}