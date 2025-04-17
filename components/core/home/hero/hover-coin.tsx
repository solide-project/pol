"use client"

import Image from "next/image"

interface HoverCoinProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: string
}

export function HoverCoin({ icon }: HoverCoinProps) {
    return (
        <>
            <Image src={icon}
                className="animate-hover relative w-[160px] sm:min-w-[256px] top-[160px] sm:top-[256px] left-[56px] sm:left-[64px]"
                alt="icon" width={0} height={0} />
            <Image src={"icons/coin-hover.svg"}
                className="shrink-0 w-[256px] sm:min-w-[360px]"
                alt="icon" width={0} height={0}  />
        </>
    )
}