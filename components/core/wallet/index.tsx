import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Wallet } from "./wallet";
import { useWCOCID } from "./hooks/ocid";
import { useWCMetamask } from "./hooks/metamask";
import { WalletConnectorEnum } from "./hooks/wallet-connector";
import Identicon from "../shared/identicon";
import { useWallet } from "./wallet-provider";
import Link from "next/link";

export function ConnectWallet() {
    const wallet = useWallet();

    const { connect: connectAsOCID } = useWCOCID();
    const { connect: connectAsMetamask } = useWCMetamask();

    const onDisconnect = async () => {
        await wallet.disconnect();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {wallet.selectedAccount ? (
                    <Button
                        variant="ghost"
                        className="text-white bg-transparent hover:bg-transparent p-0 m-0 px-2"
                    >
                        <Identicon
                            seed={wallet.selectedAccount}
                            borderRadius={9999}
                        />
                    </Button>
                ) : (
                    <Button variant="primary" className="text-white">
                        Connect
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px]"
                aria-describedby={undefined}
            >
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                    </DialogHeader>
                </VisuallyHidden>
                {!wallet.selectedAccount ? (
                    <div>
                        <Wallet
                            onConnect={connectAsOCID}
                            title="Open Campus ID"
                            type={WalletConnectorEnum.OCID}
                            src="/icons/wallet/ocid.svg"
                            status="Recommended"
                        />
                        <Wallet
                            onConnect={connectAsMetamask}
                            title="Metamask"
                            type={WalletConnectorEnum.METAMASK}
                            src="/icons/wallet/metamask.svg"
                            status="Installed"
                        />
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <Link
                            href={`/u/${wallet.selectedAccount}`}
                            className="flex items-center justify-center"
                        >
                            Profile
                        </Link>
                        <Button className="w-full mb-2" onClick={onDisconnect}>
                            Logout
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
