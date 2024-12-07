"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface BtnPoapProps extends React.HTMLAttributes<HTMLButtonElement> {
    text?: string
}

export function BtnPoap({ className, text = "For Learner" }: BtnPoapProps) {
    const router = useRouter()

    return <Button className={className} variant="secondary" onClick={() => router.push(`/p`)} >{text}</Button>
}