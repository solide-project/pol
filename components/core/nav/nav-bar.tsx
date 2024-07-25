"use client";

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { ConnectWallet } from './connect-wallet';
import { useRouter } from 'next/navigation';
import { Ribbon } from 'lucide-react';

interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function NavBar({ children }: NavBarProps) {
    const router = useRouter();
    return <div className="flex items-center justify-between sticky top-2 mx-4 px-8 h-14 z-50 rounded-lg bg-grayscale-025">
        <div className="flex items-center gap-1 hover:cursor-pointer hover:text-primary" onClick={() => router.push("/")}>
            <Ribbon size={26} className="text-primary" />
            <div className="text-xl font-heading hidden sm:block">Proof of Learn</div>
        </div>
        <div className="flex items-center gap-2">
            <ThemeToggle />
            <ConnectWallet />
        </div>
    </div>
};