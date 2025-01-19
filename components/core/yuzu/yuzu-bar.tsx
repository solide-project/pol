"use client"

import { Progress } from "@/components/ui/progress"
import { TOTAL_YUZU_POINTS } from "@/lib/util/constants"
import { useEffect, useState } from "react"

interface YuzuBarProps extends React.HTMLAttributes<HTMLDivElement> {
    total: number
}

export function YuzuBar({ total }: YuzuBarProps) {
    const [value, setValue] = useState(0)

    useEffect(() => {
        setValue(Math.round((total / TOTAL_YUZU_POINTS) * 100))
    })

    return <div className="w-full">
        <div className="text-6xl font-semibold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1] text-center">
            {total} / {TOTAL_YUZU_POINTS} Claimed
        </div>
        <Progress value={value} />
    </div>
}