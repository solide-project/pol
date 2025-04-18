"use client";

import React from "react";
import Identicon from "@/components/core/shared/identicon";
import Image from "next/image";
import { CopyText } from "@/components/core/shared/copy-text";
import { getExplorer } from "@/lib/chains";
import { getContractAddress, selectedNetwork } from "@/lib/poap";
import { UserProfileData } from "@/components/core/profile";
import Link from "next/link";
import { mask } from "@/lib/quest";

interface UserProps extends React.HTMLAttributes<HTMLDivElement> {
    address: string;
    data: UserProfileData;
}

export function User({ address, data }: UserProps) {
    const explorerUserNFT = () => {
        const chainId = selectedNetwork.id.toString();
        const uri = getExplorer(chainId);
        const contractAddress = getContractAddress(chainId);

        return `${uri}/token/${contractAddress}?tab=inventory&holder_address_hash=${address}`;
    };

    const explorerUser = () => {
        const chainId = selectedNetwork.id.toString();
        const uri = getExplorer(chainId);

        return `${uri}/address/${address}`;
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-4 items-center text-center my-2">
                <Identicon seed={address} scale={4} borderRadius={999} />
                <div className="flex text-4xl leading-[1.1] font-bold mb-3 pt-4">
                    <div className="hidden lg:block">{address}</div>
                    <div className="hidden md:block lg:hidden">
                        {mask(address, 16)}
                    </div>
                    <div className="block md:hidden">{mask(address, 10)}</div>
                </div>
                <CopyText payload={address} />
            </div>

            <div className="flex gap-2">
                <div className="flex items-center space-x-1 bg-accent dark:text-black rounded-[8px] py-[0.4rem] px-[0.8rem] truncate text-sm">
                    <Image
                        src={`/icons/icons/token.svg`}
                        height={24}
                        width={24}
                        alt="logo"
                        className="flex shrink-0"
                    />
                    <div>{data.total} Courses Completed</div>
                </div>

                <Link
                    href={explorerUserNFT()}
                    className="flex items-center space-x-1 bg-accent dark:text-black rounded-[8px] py-[0.4rem] px-[0.8rem] truncate text-sm"
                    target="_blank"
                >
                    <Image
                        src={`/icons/icons/box.svg`}
                        height={24}
                        width={24}
                        alt="logo"
                        className="flex shrink-0"
                    />
                    <div>Explorer Profile</div>
                </Link>
            </div>
        </div>
    );
}
