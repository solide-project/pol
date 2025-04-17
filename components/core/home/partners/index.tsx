"use client"

import { PartnerIcons } from "./icons"
import { PoapButton } from './button-poap';
import { UtilityButton } from './button-utility';

interface PartnerSectionProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function PartnerSection({ }: PartnerSectionProps) {

    return (
        <div className="grid grid-cols-12 gap-4 h-auto">
            <div className="col-span-12 sm:col-span-6 bg-primary rounded-lg p-8 text-white text-center">
                <div className="mb-2 text-5xl font-semibold">Trusted by the most ambitious builders</div>
                <div>Build immersive on-chain learning experiences that push boundaries, where learners earn real, verifiable achievements through interactive quests on Proof of Learn.</div>

                <div className="flex items-center justify-center gap-2 my-4">
                    <PoapButton />
                    <UtilityButton />
                </div>
            </div>
            <div className="col-span-12 sm:col-span-6 flex items-center justify-center rounded-lg bg-grayscale-050">
                <PartnerIcons />
            </div>
        </div>
    )
}