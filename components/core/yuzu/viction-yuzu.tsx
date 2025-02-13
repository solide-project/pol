"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useWallet } from "@/lib/wallet/src"
import { useTheme } from "next-themes"
import { useState } from "react"
import toast from "react-hot-toast"

interface VictionYuzuProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function VictionYuzu({ }: VictionYuzuProps) {
    const wallet = useWallet()
    const [isClaim, setIsClaiming] = useState(false)

    const handleClaim = async () => {
        try {
            setIsClaiming(true)
            await doClaim()
            toast.success("Congratz. You claimed 500 Yuzu")
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

        const response = await fetch("/api/yuzu/viction", {
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
                Be the first 88 to claim 500 Yuzu!🍊
            </div>
            <div className="text-center my-4">Complete our new Viction course and claim 500 Yuzu Points</div>
            <div className="flex items-center justify-center my-8">
                <Button onClick={handleClaim} size="xl" disabled={isClaim}>Claim</Button>
            </div>
        </section>
    )
}