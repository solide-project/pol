"use client";

import { cn } from "@/lib/utils";
import { Box, GraduationCap, PartyPopper } from "lucide-react";
import { useState } from "react";

interface Feature {
    icon: JSX.Element
    title: string
    description: string
}

const icons: Feature[] = [{
    icon: <GraduationCap size={64} strokeWidth={1} />,
    title: "On Chain",
    description: "Hands on experience learning with the blockchain is the best way to learn"
}, {
    icon: <PartyPopper size={64} strokeWidth={1} />,
    title: "Rewarded For Learning",
    description: "Get rewarded with POL POAP NFT for completing quests and activities"
}, {
    icon: <Box size={64} strokeWidth={1} />,
    title: "Open Source",
    description: "Anyone can deploy an onchain quest and support over 100+ chains and protocols"
}]

interface FeatureProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Feature({ }: FeatureProps) {
    return <div className="grid grid-cols-12 gap-4">
        {icons.map((feature, index) => (
            <div key={index} className="col-span-12 md:col-span-4">
                <FeatureCard key={index} feature={feature} />
            </div>
        ))}
    </div>
}

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
    feature: Feature
}

function FeatureCard({ feature }: FeatureCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return <div className="p-12 bg-primary text-white rounded-lg group h-[350px] flex flex-col justify-between"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
    >
        <div className="py-2">
            {feature.icon}
        </div>
        <div>
            <div className={cn("text-2xl font-bold transition-all duration-300 ease-in-out tracking-tight my-4 cursor-default",
                isHovered ? 'translate-y-0' : '-my-4 translate-y-4')}>{feature.title}</div>
            <p className={cn("text-white transition-all duration-300 ease-in-out cursor-default font-medium",
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
                {feature.description}
            </p>
        </div>
    </div>
}