"use client";


import React, { } from 'react';
import RetroGrid from "@/components/ui/retro-grid";
import { MoveRight } from "lucide-react";

import { TextAnimation } from '@/components/core/home/hero/text-animation';
import { PoapButton } from '@/components/core/home/hero/button-poap';
import { UtilityButton } from '@/components/core/home/hero/button-utility';
import { texts } from '@/components/core/home/hero/shared';

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Hero({ }: HeroProps) {
    return (
        <div className="relative h-[750px] [@media(max-height:600px)]:h-[500px] flex items-center justify-center text-center">
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
                    <TextAnimation items={texts} />
                </div>
                <div className="flex items-center justify-center gap-2">
                    <PoapButton />
                    <UtilityButton />
                </div>
            </div>
        </div>
    )
}