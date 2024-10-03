"use client"

import React from "react";
import Identicon from "../shared/identicon";
import { BadgeList } from "./badge-list";
import { Poap } from "@/lib/poap/interface";
import { mask } from "@/lib/quest";
import { CopyText } from "../shared/copy-text";
import { SuiLink } from "./sui-link";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useParams } from "next/navigation";
import { SuiProvider } from "@/components/sui-provider";

interface UserProfileProps extends React.HTMLAttributes<HTMLDivElement> {
    address: string
    poaps?: Poap[]
}

export function UserProfile({
    address,
    poaps = [],
    className
}: UserProfileProps) {
    const params = useParams<{ address: string }>()
    const { authState, ocAuth, updateAuthState } = useOCAuth();

    return <div className="mt-8">
        <div className="flex items-center justify-center">
            <div>
                <div className="flex items-center justify-center">
                    <Identicon seed={address} scale={18} borderRadius={9999} />
                </div>
                <div className="flex items-center gap-2 my-8">
                    <div className="text-3xl font-semibold truncate">
                        {mask(address)}
                    </div>
                    <CopyText payload={address} />

                    {authState.isAuthenticated && ocAuth?.getAuthInfo()?.eth_address === params.address &&
                        <SuiProvider>
                            <SuiLink />
                        </SuiProvider>
                    }
                </div>
            </div>
        </div>

        <div className="container">
            <BadgeList poaps={poaps} />
        </div>
    </div>
}