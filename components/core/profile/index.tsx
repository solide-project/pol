"use client"

import React from "react";
import { Poap } from "@/lib/poap/interface";
import { User } from "@/components/core/profile/user";
import { PoapUserCard } from "./poap-card";

interface UserProfileProps extends React.HTMLAttributes<HTMLDivElement> {
    address: string
    poaps?: Poap[]
    data: UserProfileData
}

export interface UserProfileData {
    total: number
}

export function Profile({
    address,
    poaps = [],
    data,
}: UserProfileProps) {
    return <div className="container my-8">
        <User address={address} data={data} />

        <div className="font-semibold text-lg my-4">Collection</div>

        {poaps && poaps.length > 0
            ? <div className="grid grid-cols-12 gap-4">
                {poaps.map((poap, index) => {
                    return <div key={index} className="col-span-12 lg:col-span-4">
                        <PoapUserCard poap={poap} />
                    </div>
                })}
            </div>
            : <div className="text-center my-4">User has not done any learning</div>}
    </div>
}