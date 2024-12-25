"use client"

import React, { useState } from 'react';
import { WalletModal } from './wallet-modal';
import { WalletConnectorEnum } from '../lib/wallet-connector';
import { Wallet } from './wallet';
import { useWCOCID } from '../lib/ocid';
import { useWCMetamask } from '../lib/metamask';
import { btnStyle } from './style';

interface ModalConnectProps extends React.HTMLAttributes<HTMLDivElement> {
}

export const ModalConnect = ({ className }: ModalConnectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)

    const { connect: connectAsOCID } = useWCOCID()
    const { connect: connectAsMetamask } = useWCMetamask()
    // const { connect: connectAsCoinbase } = useWCMetamask()

    return <>
        <button className={btnStyle}
            onClick={toggle}>Connect</button>
            
        <WalletModal title="Connect Wallet" isOpen={isOpen} onClose={toggle} >
            <Wallet onConnect={connectAsOCID} title="OCID" type={WalletConnectorEnum.OCID}
                src="https://raw.githubusercontent.com/solide-project/pol/refs/heads/master/public/icons/wallet/ocid.svg"
                status="Recommended" />
            <Wallet onConnect={connectAsMetamask} title="Metamask" type={WalletConnectorEnum.METAMASK}
                src="https://raw.githubusercontent.com/solide-project/pol/refs/heads/master/public/icons/wallet/metamask.svg" />
            <Wallet onConnect={async () => { return false }} title="Coinbase" type={WalletConnectorEnum.COINBASE}
                disabled={true} status="Coming Soon"
                src="https://raw.githubusercontent.com/solide-project/pol/refs/heads/master/public/icons/wallet/coinbase.svg" />
        </WalletModal>
    </>
}