"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Identicon from '@/components/core/shared/identicon';
import { mask } from "@/lib/quest";
import { CopyText } from "@/components/core/shared/copy-text";
import { useAccountModal, useChainModal } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/navigation";
import { useOCAuth } from "@opencampus/ocid-connect-js";

interface ProfileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    address: `0x${string}`
}

export function ProfileMenu({ address }: ProfileMenuProps) {
    const router = useRouter();
    const { authState, ocAuth, updateAuthState } = useOCAuth();

    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();

    const ocLogout = async () => {
        console.log("Logging out")

        ocAuth.transactionManager.clear()
        ocAuth.tokenManager.clear()
        updateAuthState({
            accessToken: "",
            idToken: "",
            isAuthenticated: false,
            error: "",
        });
    }

    return <> {
        authState.isAuthenticated && <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-2 items-center">
                <Identicon seed={ocAuth?.getAuthInfo()?.eth_address} borderRadius={9999} />
                <div>
                    {ocAuth?.getAuthInfo()?.edu_username}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="flex items-center gap-2">
                    <div className="truncate">
                        {mask(ocAuth?.getAuthInfo()?.eth_address)}
                    </div>
                    <CopyText payload={ocAuth?.getAuthInfo()?.eth_address} />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:cursor-pointer" onClick={() => router.replace(`/u/${ocAuth?.getAuthInfo()?.eth_address}`)} >
                    Goto Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:cursor-pointer" onClick={ocLogout} >
                    Logout
                </DropdownMenuItem>
                {/* {openAccountModal className="hover:cursor-pointer" && <DropdownMenuItem onClick={openAccountModal} >
                Account Details
            </DropdownMenuItem>} */}
                {/* {openChainModal className="hover:cursor-pointer" && <DropdownMenuItem onClick={openChainModal} >
                Chain Settings
            </DropdownMenuItem>} */}
            </DropdownMenuContent>
        </DropdownMenu>
    }</>
};