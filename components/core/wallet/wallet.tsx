"use client";

import React from "react";
import Image from "next/image";
import { useWallet } from "./wallet-provider";
import { WalletConnectorEnum } from "./hooks/wallet-connector";

interface WalletProps extends React.HTMLAttributes<HTMLDivElement> {
    onConnect: () => Promise<boolean>;
    title: string;
    type: WalletConnectorEnum;
    src: string;
    disabled?: boolean;
    status?: string;
}

export const Wallet = ({
    onConnect,
    title,
    type,
    src,
    disabled = false,
    status,
    className,
}: WalletProps) => {
    const { setWalletProvider } = useWallet();

    const connect = async () => {
        try {
            const isConnected = await onConnect();
            if (isConnected) {
                console.log("Connected");
                setWalletProvider(type);
            }
        } catch (e: any) {
            console.error(e);
        }
    };

    return (
        <div
            onClick={connect}
            className={`flex items-center gap-4 ${disabled ? "pointer-events-none cursor-not-allowed" : "cursor-pointer"}`}
        >
            <div className="flex items-center gap-4">
                <Image
                    src={src}
                    height={48}
                    width={48}
                    alt="icon"
                />

                <div className="space-y-2">
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {status}
                    </p>
                </div>
            </div>
        </div>
    );
};
