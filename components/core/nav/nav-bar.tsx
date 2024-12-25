"use client";

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ConnectWallet, useWallet } from '@/lib/wallet/src';
import { Button } from '@/components/ui/button';

interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function NavBar({ }: NavBarProps) {
    const router = useRouter();

    return (
        <div className="flex items-center justify-between sticky top-6 mx-4 px-8 h-[64px] z-50 rounded-lg bg-grayscale-025">
            <div className="flex items-center space-x-4 hover:cursor-pointer hover:text-primary" onClick={() => router.push("/")}>
                <div>
                    <Image src="/badge.svg" height={18} width={18} alt="logo" />
                </div>
                <div className="text-xl font-semibold hidden sm:block">Proof of Learn</div>
            </div>
            <div className="flex items-center gap-2">
                <ThemeToggle />
                <ConnectWallet disconnectModalBody={<DisconnectBody />} />
            </div>
        </div>
    )
};

const DisconnectBody = () => {
    const router = useRouter();
    const wallet = useWallet();

    return (
        <div className="my-2">
            <Button className="w-full" onClick={() => router.push(`/u/${wallet.selectedAccount}`)}>View Profile</Button>
        </div>
    )
}