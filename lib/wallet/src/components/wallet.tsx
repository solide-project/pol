"use client"

import React from 'react';
import { useWallet } from './wallet-provider';
import { WalletConnectorEnum } from '../lib/wallet-connector';

interface WalletProps extends React.HTMLAttributes<HTMLDivElement> {
    onConnect: () => Promise<boolean>;
    title: string,
    type: WalletConnectorEnum,
    src: string,
    disabled?: boolean,
    status?: string,
}

export const Wallet = ({
    onConnect,
    title,
    type,
    src,
    disabled = false,
    status,
    className
}: WalletProps) => {
    const { setWalletProvider } = useWallet()

    const connect = async () => {
        try {
            const isConnected = await onConnect()
            if (isConnected) {
                console.log("Connected")
                setWalletProvider(type)
            }
        } catch (e: any) {
            console.error(e)
        }
    }

    return <div onClick={connect}
        className={`flex items-center justify-between p-4 max-w-80 w-80 bg-grayscale-050 my-1 rounded-lg 
    ${disabled ? "pointer-events-none cursor-not-allowed" : "cursor-pointer"}`}>
        <div className="flex items-center gap-2">
            <img className="rounded-[12px]" src={src} height={40} width={40} />
            <div className="font-semibold mx-2">{title}</div>
        </div>

        {status && <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold 
        transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 
        border-transparent bg-accent text-primary-accent hover:bg-accent/80 text-primary">
            {status}
        </span>}
    </div >
}