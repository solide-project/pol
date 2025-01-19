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
        "relative isolate flex items-center gap-x-6 overflow-hidden bg-primary min-h-9 sm:before:flex-1 sticky top-0 z-50",
        isHovered ? "invisible" : ""
    )}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 cursor-pointer">
            <div className="font-medium text-white">
                {message}
            </div>
            {href &&
                <a href={href}>
                    <ArrowRight className="hover:text-accent"/>
                </a>}
        </div>
        <div className="flex flex-1 justify-end px-2">
            <X className="cursor-pointer text-white" size={18} onClick={() => setIsHovered(true)} />
        </div>
    </div>
}
