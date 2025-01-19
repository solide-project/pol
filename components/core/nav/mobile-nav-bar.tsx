"use client"

import { ThemeToggle } from "@/components/theme/theme-toggle"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { DialogTitle } from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"
import { data } from "./shared"
import { NavItem } from "./nav-item"
import Image from "next/image"

interface MobileNavBarProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function MobileNavBar({ }: MobileNavBarProps) {
    const router = useRouter()
    const [open, setOpen] = useState(false);

    const handleOnClick = (href: string) => {
        router.push(href)
        setOpen(false)
    }

    return (
        <div className="flex items-center justify-between h-[64px] px-8 rounded-lg bg-grayscale-025">
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger className="flex items-center justify-between w-full">
                    <Menu />
                    <Image src="/badge.svg" height={18} width={18} alt="logo" />
                </DrawerTrigger>
                <DrawerContent className="h-[60vh]">
                    <DialogTitle className="text-center font-semibold mt-4">Proof of Learn</DialogTitle>
                    <DrawerHeader>
                        <NavigationMenu>
                            <NavigationMenuList>
                                {data.map((item, index) => (
                                    <NavigationMenuItem key={index}>
                                        {typeof item.items === "string"
                                            ? <Link href={item.items} legacyBehavior passHref>
                                                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "py-2.5")}>
                                                    {item.title}
                                                </NavigationMenuLink>
                                            </Link>
                                            : <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), "py-2.5")}>{item.title}</NavigationMenuTrigger>}

                                        <NavigationMenuContent>
                                            <ul className="grid gap-[4px] p-1 grid-cols-12 w-[164px]">
                                                {typeof item.items !== "string" &&
                                                    item.items.map((subItem, subIndex) => {
                                                        return (
                                                            <NavItem key={subIndex}
                                                                onClick={() => handleOnClick(subItem.items as string)}
                                                                title={subItem.title} />
                                                        )
                                                    })}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>

                        <div className="flex items-center">
                            <ThemeToggle />
                        </div>
                    </DrawerHeader>
                    <DrawerFooter>
                        <DrawerClose className="flex items-center justify-center hover:text-accent">
                            <X />
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}