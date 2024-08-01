"use client";

import { Box, GraduationCap, PartyPopper } from "lucide-react";

interface FeatureProps extends React.HTMLAttributes<HTMLDivElement> { }

const icons = [{
    icon: <GraduationCap />,
    title: "On chain",
    description: "Hands on experience learning with the blockchain is the best way to learn"
}, {
    icon: <PartyPopper />,
    title: "Rewarded for Learning",
    description: "Get rewarded with POL POAP NFT for completing quests and activities"
}, {
    icon: <Box />,
    title: "Free Open Source Learning",
    description: "Anyone can deploy an onchain quest and support over 100+ chains and protocols"
}]

export function Feature({ children }: FeatureProps) {
    return <>
        <div className="text-xl leading-[1.1] sm:text-2xl md:text-4xl text-center font-bold my-8">
            Features
        </div>

        <div className="grid grid-cols-12 gap-4">
            {icons.map((icon, index) => (
                <div key={index} className="col-span-12 md:col-span-4 bg-card-gradient border border-white/[.12] rounded-xl p-6 flex flex-col h-auto md:h-[318px] overflow-y-auto">
                    <div className="bg-primary w-10 md:w-16 aspect-square rounded-lg flex items-center justify-center mb-auto shrink-0">
                        <span className="scale-125">
                            {icon.icon}
                        </span>
                    </div>
                    <h3 className="font-normal text-lg md:text-2xl pt-6 pb-2 md:py-2 tracking-tight leading-tight break-words __className_6acfdc">
                        {icon.title}
                    </h3>
                    <p className="text-sm md:text-base">
                        {icon.description}
                    </p>
                </div>
            ))}
        </div>
    </>
}