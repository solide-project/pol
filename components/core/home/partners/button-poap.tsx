"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PoapButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
}

export function PoapButton({ className, ...props }: PoapButtonProps) {
    const router = useRouter()

    return <Button className={className} variant="secondary" onClick={() => router.push(`/p`)} {...props}>For Learner</Button>
}