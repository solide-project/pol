"use client"

import "./globals.css";

import React, { useState } from 'react';
import { WalletModal } from './wallet-modal';
import { useWallet } from "./wallet-provider";
import { ModalConnect } from "./modal-connect";
import { ModalDisconnect } from "./modal-disconnect";

interface ConnectWalletProps extends React.HTMLAttributes<HTMLDivElement> {
    disconnectModalBody?: React.ReactNode;
    connectModalBody?: React.ReactNode;
}

export const ConnectWallet = ({
    connectModalBody,
    disconnectModalBody,
}: ConnectWalletProps) => {
    const { walletProvider } = useWallet()

    return <>
        {walletProvider
            ? <ModalDisconnect>{disconnectModalBody}</ModalDisconnect>
            : <ModalConnect>{connectModalBody}</ModalConnect>}
    </>
}