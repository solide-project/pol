"use client"

import { cn } from "@/lib/utils"
import { ArrowUpRight, Cross, X } from "lucide-react"
import { useState } from "react"

interface BannerCardProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Banner({ }: BannerCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return <div className={cn("bg-primary sticky top-0 z-50", isHovered ? "invisible" : "")}>
        <div className="flex items-center justify-center gap-2">
            <div className="font-bold text-white">
                Live on Mainnet 🎉. Earn Yuzu rewards and contribute to the PoL and EduChain. ₍ᐢ-(ｪ)-ᐢ₎
            </div>
            <a className="underline flex items-center hover:text-secondary" href="/q/polearn/pol-template">
                Start Learning <ArrowUpRight />
            </a>

            <X className="cursor-pointer" onClick={() => setIsHovered(true)} />
        </div>
    </div>
}