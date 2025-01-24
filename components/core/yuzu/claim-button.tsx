"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@/lib/wallet/src"
import confetti from "canvas-confetti"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface ClaimButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    token: number
    disabled?: boolean
}

export function ClaimButton({ token, disabled, ...props }: ClaimButtonProps) {
    const wallet = useWallet()
    const [isClaim, setIsClaiming] = useState(false)
    const [canClaim, setCanClaim] = useState(true)

    const handleOnClick = async () => {
        try {
            setIsClaiming(true)
            setCanClaim(true)
            const pts = await dropPoints()

            triggerConfetti()
            triggerConfetti()
            triggerConfetti()

            toast.success(`Successfully claimed ${pts} Yuzu!`)
        } catch (error: any) {
            console.error(error)
            toast.error(error.message)
            setCanClaim(false)
        } finally {
            setIsClaiming(false)
        }
    }

    const dropPoints = async () => {
        const address = await wallet.getAccount()
        console.log(`Dropping ${token} to ${address} ...`)
        if (!address) {
            throw new Error("User is not connected")
        }

        const response = await fetch("/api/yuzu", {
            method: "POST",
            body: JSON.stringify({ token, address })
        })

        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.message)
        }

        const data = await response.json()
        return data.result
    }

    const isClaimDisabled = () => {
        if (!canClaim)
            return true

        return disabled || isClaim
    }

    const triggerConfetti = () => {
        const defaults = {
            spread: 360,
            ticks: 50,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
            colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
        };

        const shoot = () => {
            confetti({
                ...defaults,
                particleCount: 40,
                scalar: 1.2,
                shapes: ["star"],
            });

            confetti({
                ...defaults,
                particleCount: 10,
                scalar: 0.75,
                shapes: ["circle"],
            });
        };

        setTimeout(shoot, 0);
        setTimeout(shoot, 100);
        setTimeout(shoot, 200);
    };

    return <Button onClick={handleOnClick} {...props} size="xl"
    disabled={isClaimDisabled()} 
    >
        {disabled ? "Coming Soon" :
            <>
                {isClaim ? "Claiming ..." : "Claim"}
            </>}
    </Button>
}