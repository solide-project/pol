import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Web3ConnectWallet } from "./connect";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export function ConnectWallet() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary" className="text-white">
                    Connect
                </Button>
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
                <div>
                    <div className="flex items-center gap-4">
                        <Image
                            src="icons/wallet/ocid.svg"
                            height={48}
                            width={48}
                            alt="icon"
                        />
                        <div className="space-y-2">
                            <div className="text-sm font-medium leading-none">
                                Open Campus
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Recommended
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="row-span-2 flex items-center">
                            <Image
                                src="icons/wallet/metamask.svg"
                                height={48}
                                width={48}
                                alt="icon"
                            />
                        </div>
                        <div className="text-sm font-medium leading-none">
                            Metamask
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Installed
                        </p>
                    </div>
                    {/* <Web3ConnectWallet /> */}
                </div>
            </DialogContent>
        </Dialog>
    );
}
