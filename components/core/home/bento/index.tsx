import Cards from "./cards";
import { BentoTitle } from "./bento-title";
import { BentoDescription } from "./bento-description";
import { BentoCard } from "./bento-card";
import { BentoFeature } from "./feature";
import { UtilityButton } from "@/components/core/home/hero/button-utility";
import { PoapButton } from "@/components/core/home/hero/button-poap";

interface BentoProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Bento({ }: BentoProps) {
    return <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div className="lg:row-span-2 rounded-lg bg-primary p-12">
            <div className="text-center text-white">
                <BentoTitle>Feature</BentoTitle>
                <BentoDescription>
                    PoL is an interactive blockchain education platform
                </BentoDescription>
            </div>

            <BentoFeature />
        </div>

        <BentoCard className="bg-grayscale-050 relative lg:h-full h-[30rem]">
            <div className="text-center mb-24">
                <BentoTitle>Verifiable NFT Badges</BentoTitle>
                <BentoDescription>
                    Earn and get reward a NFT POAP from POL
                </BentoDescription>
                <PoapButton text="Explore Poaps" />
            </div>

            <Cards />
        </BentoCard>

        <BentoCard className="bg-accent">
            <div className="text-center text-black">
                <BentoTitle>For Educators / Ecosystems</BentoTitle>
                <BentoDescription>
                    Design interactive, on-chain courses with ease, offering learners hands-on quests and blockchain-verified achievements on Proof of Learn
                </BentoDescription>
                <UtilityButton variant="outline" text="Get Started" />
            </div>
        </BentoCard>
    </div>
}