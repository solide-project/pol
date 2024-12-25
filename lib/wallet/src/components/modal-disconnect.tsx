"use client"

import React, { useState } from 'react';
import { WalletModal } from './wallet-modal';
import { useWallet } from './wallet-provider';
import Identicon from './identicon';
import { btnStyle } from './style';
import { getWalletName } from '../lib/wallet-connector';

interface ModalDisconnectProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const ModalDisconnect = ({ className, children }: ModalDisconnectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    const wallet = useWallet()

    const onDisconnect = async () => {
        await wallet.disconnect()
    }

    return <>
        <button onClick={toggle}>
            {wallet.selectedAccount && <Identicon seed={wallet.selectedAccount}
                borderRadius={9999} />}
        </button>
        <WalletModal title="Disconnect Wallet" isOpen={isOpen} onClose={toggle} >
            <div className="my-4">
                <div>{wallet.selectedAccount}</div>
                {children}
            </div>

            {wallet.walletProvider &&
                <div className="flex items-center justify-center text-xs">Connect via {getWalletName(wallet.walletProvider)}</div>}
            <button className={`${btnStyle} w-full mb-2`} onClick={onDisconnect}>Logout</button>
        </WalletModal>
    </>
}