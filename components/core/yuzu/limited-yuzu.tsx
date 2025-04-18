"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { useWallet } from "@/components/core/wallet/wallet-provider"
import { useTheme } from "next-themes"
import { useState } from "react"
import toast from "react-hot-toast"

interface LimitedYuzuProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function LimitedYuzu({ }: LimitedYuzuProps) {
    const wallet = useWallet()
    const [isClaim, setIsClaiming] = useState(false)

    const handleClaim = async () => {
        try {
            setIsClaiming(true)
            await doClaim()
            toast.success("Congratz. You claimed 10000 Yuzu")
            setIsClaiming(false)
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
            <div className="my-8 text-4xl font-semibold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-center">
                Be the first 50 to claim 10,000 Yuzu!🍊
            </div>
            <div className="text-center my-4">Complete all 3 course below to earn enough Yuzu for EDULand NFT and earn $EDU. Thanks everyone for contributing.</div>
            <div className="flex items-center justify-center my-8">
                <Button onClick={handleClaim} size="xl" disabled={true}>Completed. Remember keep learing!</Button>
            </div>
        </section>
    )
}