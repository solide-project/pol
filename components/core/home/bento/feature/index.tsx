"use client"

import { Feature, FeatureCard } from "./card";
import { Box, GraduationCap, PartyPopper } from "lucide-react";

const featureIconProps = {
    size: 64,
    strokeWidth: 2,
    color: "white"
}
const features: Feature[] = [{
    icon: <GraduationCap {...featureIconProps} />,
    title: "On Chain",
    description: "Hands on experience learning with the blockchain is the best way to learn"
}, {
    icon: <PartyPopper {...featureIconProps} />,
    title: "Rewarded For Learning",
    description: "Get rewarded with POL POAP NFT for completing quests and activities"
}, {
    icon: <Box {...featureIconProps} />,
    title: "Open Source",
    description: "Anyone can deploy an onchain quest and support over 100+ chains and protocols"
}]

export function BentoFeature() {
    return (
        <>
            {features.map((feature, index) => (
                <div key={index} className="col-span-12 md:col-span-4">
                    <FeatureCard key={index} feature={feature} />
                </div>
            ))}
        </>
    )
}