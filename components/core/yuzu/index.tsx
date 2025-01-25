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
        },
        {
            token: 2,
            title: "Your Ape-proach to Web3 - Building on ApeChain",
            image: "ipfs://QmRzDLGzMLQ31LAArN1mhf2QaBeJcPdbJoVXZ9vQ1FkEdV",
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

        <div className="scroll-m-20 text-4xl font-bold tracking-tight">
            Daily Claim
        </div>
        <div className="grid grid-cols-12 gap-3">
            {tokens.map((token, index) => {
                return (
                    <div key={index} className="col-span-12 lg:col-span-4 border rounded-lg p-4">
                        <div className="flex items-center justify-center">
                            {token.image &&
                                <IPFSImage src={token.image} alt="poap" width={164} height={164} />}
                        </div>
                        <div className="my-6 flex w-full items-stretch text-center text-xl">
                            <div className="flex-1">
                                <div className="font-semibold flex items-center justify-center h-full">
                                    {token.title}
                                </div>
                            </div>
                            <div className="w-[1px] bg-neutral-200" />
                            <div className="flex-1">
                                <div className="flex items-center justify-center h-full">
                                    <div>
                                        <div className="flex items-center justify-center gap-4">
                                            <img className="h-12" src="/yuzu/coin.svg" alt="logo" />
                                        </div>
                                        <div>{YUZU_POINTS[token.token].points} Yuzu Points</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="flex items-center justify-center">
                            <ClaimButton token={token.token} disabled={token.disabled} />
                        </div>
                    </div>
                )
            })}
        </div>
        <Faq />
    </div>
}