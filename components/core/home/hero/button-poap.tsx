"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PoapButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    text?: string
}

export function PoapButton({ className, text = "For Learner" }: PoapButtonProps) {
    const router = useRouter()

    return <Button className={className} variant="secondary" onClick={() => router.push(`/p`)} >{text}</Button>
}