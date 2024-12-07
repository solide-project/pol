"use client"

import * as React from "react"
import { Icons } from "./icons"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { getContractAddress, selectedNetwork } from "@/lib/poap"
import { getExplorer } from "@/lib/chains"

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
}


const iconClassName = "h-4 w-6 shrink-0 hover:cursor-pointer hover:text-primary"
const items = [{
    icon: <Icons.globe className={iconClassName} />,
    href: `${getExplorer(selectedNetwork.id.toString())}/address/${getContractAddress(selectedNetwork.id.toString())}`,
    text: "POL Poap"
},
{
    icon: <Icons.x className={iconClassName} />,
    href: "https://x.com/0xProofOfLearn",
    text: "Follow us on X"
},
{
    icon: <Icons.github className={iconClassName} />,
    href: "https://github.com/solide-project/pol",
    text: "Found a bug? New feature? Check out our GitHub"
}]
export function Footer({ }: FooterProps) {
    return <div className="px-8 py-4 flex items-center justify-between rounded-lg bg-grayscale-025 z-50 mx-4 my-2 mt-8">
        <div>
            {" "}
        </div>
        <div className="flex items-center space-x-1 md:space-x-2">
            {items.map((item, index) => {
                return <Tooltip key={index}>
                    <TooltipTrigger asChild>
                        <a href={item.href} target="_blank" rel="noreferrer">
                            {item.icon}
                        </a>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{item.text}</p>
                    </TooltipContent>
                </Tooltip>
            })}
        </div>
    </div>
}