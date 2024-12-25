"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Poap } from "@/lib/poap"
import { VerificationContent } from "@/components/core/profile/verification/content";

interface VerificationDialogProps extends React.HTMLAttributes<HTMLDivElement> {
    poap: Poap
}

export function VerificationDialog({ poap }: VerificationDialogProps) {
    return <Dialog>
        <DialogTrigger asChild>
            <div className="flex items-center justify-center">
                <Button variant="outline">View Verification</Button>
            </div>
        </DialogTrigger>
        <DialogContent className="max-h-[720px] max-w-[800px] overflow-auto">
            <DialogHeader>
                <DialogTitle>Verification</DialogTitle>
            </DialogHeader>
            <VerificationContent cid={poap.verification} />
        </DialogContent>
    </Dialog>
}
