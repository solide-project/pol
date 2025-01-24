"use client"

import { useEffect, useState } from "react"
import { useWallet } from "@/lib/wallet/src"
import { YuzuUserData } from "@/lib/db/yuzu"

interface UserYuzuProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function UserYuzu({ }: UserYuzuProps) {
    const wallet = useWallet();
    const [history, setHistory] = useState<YuzuUserData[]>([])
    const [total, setTotal] = useState<number>(0)

    const handleUserPoints = async () => {
        const address = await wallet.getAccount()
        if (!address) return

        const response = await fetch(`/api/yuzu/${address}`)
        if (!response.ok) {
            return
        }

        const data = await response.json()
        setHistory(data.result.data)
        setTotal(data.result.total)
    }

    // Will add in future
    useEffect(() => {
        (async () => {
            await handleUserPoints()
        })()
    }, [wallet.walletProvider])

    useEffect(() => {
        (async () => {
            await handleUserPoints()
        })()
    }, [])

    return <div className="flex items-center justify-between gap-2 font-semibold text-2xl my-1">
        <div>Your Yuzu Points:</div>

        <div className="flex items-center gap-2">
            <img className="h-16" src="/yuzu/coin.svg" alt="logo" />
            <div>{total}</div>

            {/* {history.map((item, index) => {
                return (
                    <div key={index}>
                        {item.reason}
                        Total Points: {item.multiply ? item.points * item.multiply : item.points}
                        {item.timestamp}
                    </div>
                )
            })} */}
        </div>
    </div>
}