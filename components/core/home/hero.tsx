"use client";

import { cn } from "@/lib/utils";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import RetroGrid from "@/components/ui/retro-grid";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";

const texts: TextSwitcher[] = [
    {
        text: "Open Campus",
        colour: "#00edbe",
        icon: "icons/open-campus.svg"
    },
    {
        text: "Ape Coin",
        colour: "#002687",
        icon: "icons/apecoin.svg"
    },
    {
        text: "Ethereum",
        colour: "#156fee",
        icon: "icons/eth.svg"
    },
    {
        text: "Uniswap",
        colour: "#FF007A",
        icon: "icons/uniswap.svg"
    },
]

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Hero({ }: HeroProps) {
    const router = useRouter()

    return <div className="relative h-[750px] [@media(max-height:600px)]:h-[500px] flex items-center justify-center text-center">
        <RetroGrid />

        <div className="-m-4 z-10">
            <div className="flex-col sm:flex">
                <a href="https://medium.com/edu-chain/announcing-the-winners-of-edu-chain-hackathon-semester-1-6554808bbf5a" rel="noopener noreferrer" target="_blank"
                    className="flex items-center justify-center my-4">
                    <div className="border border-gray py-1 md:py-[4px] px-3 rounded-full bg-grayscale-025 text-center flex items-center space-x-2">
                        <span>🎖️ 1st Place Learn Track - EDU Chain Hackathon</span>
                        <MoveRight />
                    </div>
                </a>
                <div className="font-bold text-5xl md:text-6xl lg:text-7xl">Learn on {"\t"}</div>
                <BouncingTextSwitcher items={texts} />
            </div>
            <div className="flex items-center justify-center gap-2">
                <Button variant="secondary" onClick={() => router.push(`/p`)} >For Learners</Button>
                <Button onClick={() => router.push(`/utility`)}>For Creators</Button>
            </div>
        </div>
    </div>
}

interface TextSwitcher {
    text: string
    colour?: string
    icon?: string
}

interface BouncingTextSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
    items: TextSwitcher[]
    interval?: number
}

const BouncingTextSwitcher = ({ items, interval = 2000 }: BouncingTextSwitcherProps) => {
    const [index, setIndex] = useState(0);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        const switcher = setInterval(() => {
            setAnimationClass('slide-out'); // Trigger slide-out animation

            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % items.length);
                setAnimationClass('slide-in'); // Trigger slide-in animation
            }, 500); // Match with the CSS animation duration
        }, interval);

        return () => clearInterval(switcher);
    }, [items, interval]);

    return (
        <div className={`flex items-center space-x-4 mb-8 md:mb-16 sliding-text ${animationClass}`}>
            <div className={cn("font-bold text-5xl md:text-6xl lg:text-7xl",
                items[index].colour ? `text-[${items[index].colour}]` : "")}>{items[index].text}</div>
            {items[index].icon &&
                <Image src={items[index].icon} alt="icon" width={64} height={64} />}
        </div>
    );
};
