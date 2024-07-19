"use client"

import { Button } from '@/components/ui/button';
import {
    useConnectModal,
    useAccountModal,
    useChainModal,
} from '@rainbow-me/rainbowkit';

export const ConnectWallet = () => {
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    return (
        <>
            {openConnectModal && (
                <Button onClick={openConnectModal} type="button">
                    Sign In
                </Button>
            )}
            {openAccountModal && (
                <Button onClick={openAccountModal} type="button">
                    Open Account Modal
                </Button>
            )}
            {openChainModal && (
                <Button onClick={openChainModal} type="button">
                    Open Chain Modal
                </Button>
            )}
        </>
    );
};