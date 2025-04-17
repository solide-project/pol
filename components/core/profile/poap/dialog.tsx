"use client";

import { buttonVariants } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Poap } from "@/lib/poap";
import { cn } from "@/lib/utils";
import { CoursePage } from "../../home/poap/course-page";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface PoapDialogProps extends React.HTMLAttributes<HTMLDivElement> {
    poap: Poap;
}

export function PoapDialog({ poap }: PoapDialogProps) {
    return (
        <Dialog>
            <DialogTrigger
                className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full font-medium",
                )}
            >
                Course Overview
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                </VisuallyHidden>
                <CoursePage
                    tokenId={Number(poap.tokenId)}
                    poap={poap.metadata}
                    uri={poap.uri}
                />
            </DialogContent>
        </Dialog>
    );
}
