"use client"

import { Button } from '@/components/ui/button';
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
} from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import Identicon from '@/components/core/shared/identicon';
import { ProfileMenu } from './profile-menu';

export const ConnectWallet = () => {
    const { openConnectModal } = useConnectModal();
    const { address } = useAccount();
    return (
        <>
            {openConnectModal && (
                <Button onClick={openConnectModal} type="button">
                    Sign In
                </Button>
            )}

            {address && <ProfileMenu address={address} />}
        </>
    );
};