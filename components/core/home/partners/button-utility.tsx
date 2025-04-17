"use client"

import { buttonVariants } from "@/components/ui/button";
import { CREATOR_DOMAIN } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface UtilityButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "secondary" | null | undefined
}

export function UtilityButton({ className, variant }: UtilityButtonProps) {
    return (
        <a className={cn(buttonVariants({ variant }), className)}
            href={CREATOR_DOMAIN}>
            For Creators
        </a>
    )
}