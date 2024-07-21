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

interface ProfileMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    address: `0x${string}`
}

export function ProfileMenu({ address }: ProfileMenuProps) {
    const router = useRouter();

    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();

    return <DropdownMenu>
        <DropdownMenuTrigger>
            <Identicon seed={address} borderRadius={9999} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel className="flex items-center gap-2">
                <div className="truncate">
                    {mask(address)}
                </div>
                <CopyText payload={address} />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.replace(`/u/${address}`)} >
                Goto Profile
            </DropdownMenuItem>
            {openAccountModal && <DropdownMenuItem onClick={openAccountModal} >
                Account Details
            </DropdownMenuItem>}
            {openChainModal && <DropdownMenuItem onClick={openChainModal} >
                Chain Settings
            </DropdownMenuItem>}
        </DropdownMenuContent>
    </DropdownMenu>
};