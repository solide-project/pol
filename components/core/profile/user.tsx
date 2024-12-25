"use client"

import React from "react";
import Identicon from "@/components/core/shared/identicon";
import { mask } from "@/lib/quest";
import { CopyText } from "@/components/core/shared/copy-text";
import { getExplorer } from "@/lib/chains";
import { getContractAddress, selectedNetwork } from "@/lib/poap";
import { Badge, UserRound } from "lucide-react";
import { UserProfileData } from "@/components/core/profile";

interface UserProps extends React.HTMLAttributes<HTMLDivElement> {
    address: string
    data: UserProfileData
}

export function User({
    address,
    data,
}: UserProps) {
    const explorerUserNFT = () => {
        const chainId = selectedNetwork.id.toString()
        const uri = getExplorer(chainId);
        const contractAddress = getContractAddress(chainId)

        return `${uri}/token/${contractAddress}?tab=inventory&holder_address_hash=${address}`
    }

    const explorerUser = () => {
        const chainId = selectedNetwork.id.toString()
        const uri = getExplorer(chainId);

        return `${uri}/address/${address}`
    }

    return (
        <div className="flex items-center gap-4">
            <Identicon seed={address} scale={18} borderRadius={12} />

            <div className="flex flex-col gap-4">
                <p className="text-xl">
                    {mask(address, 8)}
                </p>
                <p className="text-3xl md:text-5xl font-semibold truncate">
                    POAP Earned: {data.total}
                </p>
                <div className="flex gap-2">
                    <CopyText payload={address} />

                    <a href={explorerUser()} target="_blank">
                        <UserRound />
                    </a>
                    <a href={explorerUserNFT()} target="_blank">
                        <Badge />
                    </a>
                </div>
            </div>
        </div>
    )
}