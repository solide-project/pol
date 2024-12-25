"use client"

import React from "react";
import { BadgeList } from "@/components/core/profile/badge-list";
import { Poap } from "@/lib/poap/interface";
import { User } from "@/components/core/profile/user";

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
    return <div className="container my-12">
        <User address={address} data={data} />
        <BadgeList poaps={poaps} />
    </div>
}