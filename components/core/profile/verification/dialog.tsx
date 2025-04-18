"use client";

import { Button, buttonVariants } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Poap } from "@/lib/poap"
import { VerificationContent } from "@/components/core/profile/verification/content";
import { cn } from "@/lib/utils";

interface VerificationDialogProps extends React.HTMLAttributes<HTMLDivElement> {
    poap: Poap
}

export function VerificationDialog({ poap }: VerificationDialogProps) {
    return <Dialog>
        <DialogTrigger className={cn(buttonVariants({ variant: "secondary" }), "w-full font-medium")}>
            View Verification
        </DialogTrigger>
        <DialogContent className="max-h-[80%] !max-w-3xl overflow-auto">
            <DialogHeader>
                <DialogTitle className="font-bold text-2xl">Verification</DialogTitle>
            </DialogHeader>

            <div className="max-w-full">
                <VerificationContent name={poap.metadata.name} cid={poap.verification} />
            </div>
        </DialogContent>
    </Dialog>
}
