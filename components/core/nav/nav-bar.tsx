"use client";

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useRouter } from 'next/navigation';
import { OCIDConnect } from './ocid-connect';
import Image from 'next/image';

interface NavBarProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function NavBar({ children }: NavBarProps) {
    const router = useRouter();

    return <div className="flex items-center justify-between sticky top-2 mx-4 px-8 h-14 z-50 rounded-lg bg-grayscale-025">
        <div className="flex items-center gap-2 hover:cursor-pointer hover:text-primary" onClick={() => router.push("/")}>
            <div>
                <Image src="/badge.svg" height={24} width={24} alt="logo" />
            </div>
            <div className="text-xl font-semibold hidden sm:block">Proof of Learn</div>
        </div>
        <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* <ConnectWallet /> */}
            <OCIDConnect />
        </div>
    </div>
};