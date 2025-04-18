"use client"

import { cn } from "@/lib/utils"
import { ArrowRight, X } from "lucide-react"
import { useState } from "react"

interface BannerCardProps extends React.HTMLAttributes<HTMLDivElement> {
    message: string
    href?: string
}

export function Banner({ message, href }: BannerCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return <div className={cn(
        "relative isolate flex items-center gap-x-6 overflow-hidden bg-primary py-[5px] sm:before:flex-1 sticky top-0 z-50",
        isHovered ? "hidden" : ""
    )}>
        <div className="flex flex-wrap items-center gap-x-2 cursor-pointer">
            <div className="font-sm text-white">
                {message}
            </div>
            {href &&
                <a href={href}>
                    <ArrowRight className="hover:text-accent" size={18} color="white" />
                </a>}
        </div>
        <div className="flex flex-1 justify-end px-2">
            <X className="cursor-pointer" size={18} color="white" onClick={() => setIsHovered(true)} />
        </div>
    </div>
}
