"use client";

import { ThemeToggle } from '@/components/theme/theme-toggle';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from './logo';
import { NavMenu } from './nav-menu';
import { navigationBarStyle } from './shared';
import { ConnectWallet } from '../wallet';

interface NavDesktopProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string
}

export function NavDesktop({ width = "40rem" }: NavDesktopProps) {
    return (
        <div className={`flex items-center justify-between max-w-[${width}] pt-1 pb-1 pl-4 pr-1 rounded-[16px] space-x-4`}
            style={{ ...navigationBarStyle() }}>
            <Logo />
            <div className="flex">
                <NavMenu />
            </div>
            <div className="flex items-center gap-2">
                <ThemeToggle />
                {/* <ConnectWallet disconnectModalBody={<DisconnectBody />} /> */}
                <ConnectWallet />
            </div>
        </div >
    )
};

// const DisconnectBody = () => {
//     const router = useRouter();
//     const wallet = useWallet();

//     return (
//         <div className="my-2">
//             <Button className="w-full" onClick={() => router.push(`/u/${wallet.selectedAccount}`)}>View Profile</Button>
//         </div>
//     )
// }