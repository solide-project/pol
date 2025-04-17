"use client"

import { useEffect, useState } from "react"
import { HoverCoin } from "./hover-coin"

export interface TextSwitcher {
    text: string
    colour?: string
    icon: string
}

export const items: TextSwitcher[] = [
    {
        text: "Open Campus",
        colour: "#00EDBE",
        icon: "icons/coin-edu.svg"
    },
    {
        text: "Ape Coin",
        colour: "#002687",
        icon: "icons/coin-ape.svg"
    },
    {
        text: "Ethereum",
        colour: "#156FEE",
        icon: "icons/coin-eth.svg"
    },
    {
        text: "Arbitrum",
        colour: "#FF007A",
        icon: "icons/coin-arb.svg"
    },
]

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    interval?: number
}

export function HeroSection({ interval = 2000 }: HeroSectionProps) {
    const [index, setIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        const switcher = setInterval(() => {
            setAnimationClass('slide-out'); // Trigger slide-out animation

            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % items.length);
                setAnimationClass('slide-in'); // Trigger slide-in animation
            }, 500);
        }, interval);

        return () => clearInterval(switcher);
    }, [items, interval]);

    return (
        <div className="grid grid-cols-12 gap-4 h-auto mt-0 sm:mt-[-256px]">
            <div className="col-span-12 lg:col-span-7 sm:col-span-6 flex items-center justify-center mb-[256px] sm:mt-[488px]">
                <div className="font-bold text-5xl md:text-6xl lg:text-7xl text-center gap-4">
                    <div>Learn about</div>
                    <div className={`sliding-text ${animationClass} text-[${items[index].colour ?? "black"}]`}>
                        {items[index].text}
                    </div>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-5 sm:col-span-6 flex items-center justify-center order-first mt-[-128px] sm:m-0 sm:order-last">
                <div>
                    <HoverCoin icon={items[index].icon} />
                </div>
            </div>
        </div>
    )
}