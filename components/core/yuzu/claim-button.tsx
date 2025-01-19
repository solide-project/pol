"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@/lib/wallet/src"
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
            await dropPoints()
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
        console.log(data)
    }

    const isClaimDisabled = () => {
        if (!canClaim)
            return true

        return disabled || isClaim
    }

    return <Button onClick={handleOnClick} {...props} disabled={isClaimDisabled()} size="xl">
        {disabled ? "Coming Soon" :
            <>
                {isClaim ? "Claiming ..." : "Claim"}
            </>}
    </Button>
}