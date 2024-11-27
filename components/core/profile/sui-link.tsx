"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { createWalletClient, custom, isAddressEqual } from "viem";
import { mainnet } from "viem/chains";
import { ConnectButton, ConnectModal, useCurrentAccount, useSignPersonalMessage } from '@mysten/dapp-kit';
import { ACCOUNT_LINK_MESSAGE } from "@/lib/quest/utils";

interface SuiLinkProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function SuiLink({ }: SuiLinkProps) {
    const { authState, ocAuth, updateAuthState } = useOCAuth();

    const [evmAddr, setEvmAddr] = useState("")
    const [evmSign, setEvmSign] = useState("")

    const [suiAddr, setSuiAddr] = useState("")
    const [suiSign, setSuiSign] = useState("")

    const { mutate: signPersonalMessage } = useSignPersonalMessage();
    const currentAccount = useCurrentAccount();

    const signEVM = async () => {
        const walletClient = createWalletClient({
            chain: mainnet,
            transport: custom(window.ethereum),
        });

        const [userAddress] = await walletClient.getAddresses();

        if (!userAddress) {
            toast.error("Please connect POL to metamask account")
            return
        }

        if (!isAddressEqual(userAddress, ocAuth?.getAuthInfo()?.eth_address)) {
            toast.error(`Please connect correct address for signing. Current connected: ${userAddress}`)
            return
        }

        // Request the user to sign the message
        const signature = await walletClient.signMessage({
            account: userAddress,
            message: ACCOUNT_LINK_MESSAGE,
        });

        console.log(signature)
        setEvmAddr(userAddress)
        setEvmSign(signature)
    }

    const signSUI = async () => {
        if (!currentAccount) {
            toast.error(`Please connect correct address for signing. Current connected: ${currentAccount}`)
            return
        }

        signPersonalMessage(
            {
                message: new TextEncoder().encode(ACCOUNT_LINK_MESSAGE),
            },
            {
                onSuccess: (result) => {
                    setSuiAddr(currentAccount.address)
                    setSuiSign(result.signature)
                },
            },
        );
    }

    const [isLinking, setIsLinking] = useState(false)
    const linkAccount = async () => {
        try {
            setIsLinking(true)
            await doLink()
            toast.success("Successfully linked")
        } catch (e: any) {
            toast.error(e.message)
        } finally {
            setIsLinking(false)
        }
    }

    const doLink = async () => {
        const walletClient = createWalletClient({
            chain: mainnet,
            transport: custom(window.ethereum),
        });

        const [userAddress] = await walletClient.getAddresses();

        if (!userAddress) {
            toast.error("Please connect POL to metamask account")
            return
        }

        if (!isAddressEqual(userAddress, ocAuth?.getAuthInfo()?.eth_address)) {
            toast.error(`Please connect correct address for signing. Current connected: ${userAddress}`)
            return
        }

        const response = await fetch("/api/db/user/link", {
            method: "POST",
            body: JSON.stringify({
                evm: evmAddr, evmSign: evmSign, sui: suiAddr, suiSign: suiSign
            }),
        })

        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.message)
        }

        const data = await response.json()
        console.log(data)
    }

    return <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you absolutely sure? Note linking, will not unlink and you&apos;ll need to use another account from either address</DialogTitle>
                <div className="flex items-center justify-center">
                    <ConnectButton connectText="Connect Sui" />
                </div>
                <div className="flex items-center justify-center">
                    <Button onClick={signEVM}>Verify EVM</Button>

                    <Button onClick={signSUI}>Verify Sui</Button>
                </div>

                <Button onClick={linkAccount} disabled={!(evmSign && suiSign) || isLinking}>
                    {isLinking ? "Linking..." : "Link"}
                </Button>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}