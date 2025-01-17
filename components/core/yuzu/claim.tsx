"use client"

import { Button } from "@/components/ui/button"

interface DefinitionProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Definition({ }: DefinitionProps) {
    const handleDrop = async () => {
        console.log("Dropping...")
    }
    
    return <div>
        <Button onClick={handleDrop}>
            Claim
        </Button>
    </div>
}