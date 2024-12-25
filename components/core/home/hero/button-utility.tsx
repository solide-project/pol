"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface UtilityButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    text?: string
    variant?: "default" | "outline" | "secondary" | null | undefined
}

export function UtilityButton({ className, variant, text = "For Creators" }: UtilityButtonProps) {
    const router = useRouter()

    return <Button className={className} variant={variant} onClick={() => router.push(`/utility`)} >{text}</Button>
}