"use client"

import { ThemeToggle } from "@/components/theme/theme-toggle"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { DialogTitle } from "@radix-ui/react-dialog"
import { navigationBarStyle } from "./shared"
import { NavMenu } from "./nav-menu"
import { Logo } from "./logo"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ConnectWallet } from "../wallet"


interface NavMobileProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string
}

export function NavMobile({ width = "40rem" }: NavMobileProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className={`flex items-center justify-between max-w-[${width}] pt-1 pb-1 px-8 rounded-[16px]`}
            style={{ ...navigationBarStyle() }}>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger className="flex items-center justify-between w-full h-10">
                    <Menu />
                    <Logo />
                </DrawerTrigger>
                <DrawerContent className="h-[80vh]">
                    <DialogTitle className="text-center font-semibold mt-4">Proof of Learn</DialogTitle>
                    <DrawerHeader className="px-4">
                        <div className="flex items-center justify-between gap-2">
                            <NavMenu />
                            <ThemeToggle />
                        </div>
                        <ConnectWallet />
                    </DrawerHeader>
                    <DrawerFooter>
                        <DrawerClose className="flex items-center justify-center hover:text-accent">
                            <X />
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div >
    )
}