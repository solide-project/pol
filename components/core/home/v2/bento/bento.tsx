import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Box, GraduationCap, PartyPopper } from "lucide-react";
import { Feature, FeatureCard } from "../features/feature-card"
import CardsStack from "../../cards-stack";
import Cards from "./cards";
import { BentoTitle } from "./bento-title";
import { BentoDescription } from "./bento-description";
import { BentoCard } from "./bento-card";
import { FeatureCards } from "../features/features";
import { BtnUtility } from "../btn-utility";
import { BtnPoap } from "../btn-poap";

interface FeatureBentoProps extends React.HTMLAttributes<HTMLDivElement> {
}

const size = 49;
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

export function FeatureBento({ }: FeatureBentoProps) {
    return <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div className="lg:row-span-2 rounded-lg bg-primary p-12">
            <div className="text-center text-white">
                <BentoTitle>Feature</BentoTitle>
                <BentoDescription>
                    PoL is an interactive blockchain education platform
                </BentoDescription>
            </div>

            <FeatureCards />
        </div>
        <BentoCard className="bg-grayscale-050 relative lg:h-full h-[30rem]">
            <div className="text-center mb-24">
                <BentoTitle>Verifiable NFT Badges</BentoTitle>
                <BentoDescription>
                    Earn and get reward a NFT POAP from POL
                </BentoDescription>
                <BtnPoap text="Explore Poaps" />
            </div>

            <div>
                <Cards />
            </div>
        </BentoCard>
        <BentoCard className="bg-accent">
            <div className="text-center text-black">
                <BentoTitle>For Educators / Ecosystems</BentoTitle>
                <BentoDescription>
                    Design interactive, on-chain courses with ease, offering learners hands-on quests and blockchain-verified achievements on Proof of Learn
                </BentoDescription>
                <BtnUtility variant="outline" text="Get Started" />
            </div>
        </BentoCard>
    </div>
}