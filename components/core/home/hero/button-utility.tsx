"use client"

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UtilityButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    text?: string
    variant?: "default" | "outline" | "secondary" | null | undefined
}

export function UtilityButton({ className, variant, text = "For Creators" }: UtilityButtonProps) {
    return (
        <a className={cn(buttonVariants({ variant }), className)}
            href="https://creator.solide0x.tech">
            {text}
        </a>
    )
}