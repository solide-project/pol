"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { useWallet } from "@/lib/wallet/src"
import { useTheme } from "next-themes"
import toast from "react-hot-toast"

interface LimitedYuzuProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function LimitedYuzu({ }: LimitedYuzuProps) {
    const wallet = useWallet()

    const handleClaim = async () => {
        try {
            await doClaim()
            toast.success("Congratz. You claimed 10000 Yuzu")
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const doClaim = async () => {
        const address = await wallet.getAccount()
        if (!address) {
            throw new Error("User is not connected")
        }

        const response = await fetch("/api/yuzu/limited", {
            method: "POST",
            body: JSON.stringify({
                address
            })
        })

        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.message)
        }

        const data = await response.json()
        
        return data
    }

    return (
        <section className="rounded-lg w-full border my-8">
            <div className="text-4xl font-semibold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-center">
                Be the first 50
            </div>

            <Button onClick={handleClaim}>Claim</Button>
        </section>
    )
}