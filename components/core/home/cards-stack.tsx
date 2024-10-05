import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';

export default function CardsStack() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);  // State to track hovered card

    const cards = [
        {
            title: 'Deploy with Proof of Learn',
            image: "https://api.universalprofile.cloud/ipfs/QmStw2E79stkmBH9kjjRYHVoPNztrbQsxXchfxTnmRVh3h",
        },
        {
            title: 'Ape Coin Staking',
            image: "https://api.universalprofile.cloud/ipfs/QmaFtQ4LTHcCb1BhPRTrKe1gVnsK9tZiXrLnzUwxB6Piag",
        },
        {
            title: 'Victionary - Everything about Viction',
            image: "https://api.universalprofile.cloud/ipfs/QmeuovPSUK2JpK6SYnCSkGsQ9Pduo1U4ZMvEwRELbjzPgw",
        },
        {
            title: 'Coming Soon!',
            image: "./icons/eth.svg",
        },
    ];

    return (
        <div className="relative h-[500px] w-[400px] px-20 sm:px-0 md:w-[200px] overflow-hidden sm:overflow-visible">
            {cards.reverse().map((card, index) => (
                <Card
                    key={index}
                    className={cn("absolute w-64 text-foreground shadow-lg transform transition-all duration-300 ease-in-out group cursor-pointer bg-grayscale-025",
                        hoveredIndex === index ? 'z-50 -translate-y-10 scale-105' : 'z-10')}
                    style={{
                        transform: `rotate(${-30 + index * 20}deg) translateX(${-100 + index * 50}px)`,
                        // top: `${index * 15}px`,
                        // left: `${index * 15}px`,
                        transition: 'transform 0.3s ease-in-out, z-index 0s ease-in-out',
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <CardContent className="p-4">
                        <img src={card.image} alt={card.title} className="w-full h-auto transition-transform duration-1000 ease-in-out group-hover:scale-105" />
                        <div className="text-center font-semibold mt-2">{card.title}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
