"use client"

import { Button } from "@/components/ui/button"
import { Definition } from "./definition"
import { UserYuzu } from "./user-yuzu"
import { ClaimButton } from "./claim-button";
import { YuzuBar } from "./yuzu-bar";
import { useEffect } from "react";
import { POLPoapContract } from "@/lib/poap/contract";
import { IPFSImage } from "../shared/ipfs-image";
import { YUZU_POINTS } from "@/lib/util/constants";
import { Faq } from "./faq";

interface YuzuPageProps extends React.HTMLAttributes<HTMLDivElement> {
    total: number
}

const tokens: {
    token: number,
    disabled?: boolean,
    title: string,
    image?: `ipfs://${string}`
}[] = [
        {
            token: 0,
            title: "Deploy Your First Smart Contract on EDU Chain",
            image: "ipfs://QmNzhFeiYXRtAiczXg35EcUSvzeADKQgi4MgHfMzNHzu8c"
        },
        {
            token: 1,
            title: "Pratical guide to staking BAYC and Ape Coin",
            image: "ipfs://QmV62cSfT9HZXqQMv2QPatKWG2d2WWaRE1ss4iFGW8QAwW",
            disabled: true
        },
        {
            token: 2,
            title: "Your Ape-proach to Web3 - Building on ApeChain",
            image: "ipfs://QmRzDLGzMLQ31LAArN1mhf2QaBeJcPdbJoVXZ9vQ1FkEdV",
            disabled: true
        },
    ];

export function YuzuPage({ total }: YuzuPageProps) {
    return <div className="w-full container mb-8">
        <div className="my-10 scroll-m-20 text-4xl font-bold tracking-tight">
            Yuzu: First Harvest
        </div>
        <div className="flex items-center justify-center my-4">
            <YuzuBar total={total} />
        </div>

        <Definition />
        <UserYuzu />
        {tokens.map((token, index) => {
            return (
                <div key={index} className="flex items-center justify-between gap-4 my-2">
                    <div className="flex items-center gap-4">
                        {token.image &&
                            <IPFSImage src={token.image} alt="poap" width={164} height={164} />}
                        <div className="text-2xl font-bold text-center flex">
                            <div className="hidden lg:block">
                                {token.title} -
                            </div>
                            <div>
                                {"  "}{YUZU_POINTS[token.token].points} Points
                            </div>
                        </div>
                    </div>

                    <ClaimButton token={token.token} disabled={token.disabled} />
                </div>
            )
        })}

        <Faq />
    </div>
}