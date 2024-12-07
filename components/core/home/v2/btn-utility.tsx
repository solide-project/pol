"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface BtnUtilityProps extends React.HTMLAttributes<HTMLButtonElement> {
    text?: string
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "iconSecondary" | "iconPrimary" | "linkHover1" | "linkHover2" | null | undefined
}

export function BtnUtility({ className, variant, text = "For Creators" }: BtnUtilityProps) {
    const router = useRouter()

    return <Button className={className} variant={variant} onClick={() => router.push(`/utility`)} >{text}</Button>
}