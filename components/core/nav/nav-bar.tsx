"use client";

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ConnectWallet } from './connect-wallet';


interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function NavBar({ children }: NavBarProps) {
    return <div className="flex items-center sticky top-2 mx-4 h-12 z-50 rounded-lg bg-grayscale-025">
        <ThemeToggle />
        <ConnectWallet />
    </div>
};