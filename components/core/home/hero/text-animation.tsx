"use client";

import { cn } from "@/lib/utils";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { TextSwitcher } from "@/components/core/home/hero/shared";

interface BouncingTextSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
    items: TextSwitcher[]
    interval?: number
}

export const TextAnimation = ({ items, interval = 2000 }: BouncingTextSwitcherProps) => {
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
