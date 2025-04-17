"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image"
import { components } from "./shared"
import { CREATOR_DOMAIN, DOC_DOMAIN } from "@/lib/constants"

export function NavMenu() {
    return (
        // <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2 ">
        //     {components.map((component, index) => (
        //         <ListItem
        //             icon={component.icon}
        //             key={index}
        //             title={component.title}
        //             href={component.href}
        //             target="_blank"
        //         >
        //             {component.description}
        //         </ListItem>
        //     ))}
        // </ul>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-transparent rounded-[16px]">Learn</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-1 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <a className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href={CREATOR_DOMAIN} target="_blank">
                                        <div className="flex items-center justify-center">
                                            <Image src="/icons/nav/blocks.svg" height={48} width={48} alt="icon"
                                                className="shrink-0" />
                                        </div>
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            Creator Platform
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground hidden sm:block">
                                            Design interactive, on-chain courses with ease,
                                            offering learners hands-on quests and blockchain-verified
                                            achievements on Proof of Learn
                                        </p>
                                    </a>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/p" title="Courses" icon="courses.svg">
                                View NFT POAPs and courses
                            </ListItem>
                            <ListItem title="Documentation" icon="docs.svg"
                                href={DOC_DOMAIN} target="_blank">
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={cn("bg-transparent hover:bg-transparent rounded-[16px]")}>Build</NavigationMenuTrigger>
                    <NavigationMenuContent className="border-none shadow-none">
                        <ul className="grid w-[256px] md:w-[500px] gap-3 p-1 md:grid-cols-2 ">
                            {components.map((component, index) => (
                                <ListItem
                                    icon={component.icon}
                                    key={index}
                                    title={component.title}
                                    href={component.href}
                                    target="_blank"
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href="/yuzu" legacyBehavior passHref>
                        <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-transparent rounded-[16px]")}>
                            <div className="flex items-center gap-1">
                                <img className="h-5" src="/yuzu/coin.svg" alt="logo" />
                                <span className="text-primary">Yuzu</span>
                            </div>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

interface ListItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    icon?: string
}

function ListItem({ icon, className, title, children, ...props }: ListItemProps) {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    className={cn(
                        "block select-none space-y-1 rounded-[16px] p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="grid grid-cols-2 text-left">
                        <div className="row-span-2 flex items-center justify-center">
                            {icon && <Image src={`/icons/nav/${icon}`} height={8} width={8} alt="icon"
                                className="h-[28px] w-[28px] sm:h-[48px] sm:w-[48px] shrink-0" />}
                        </div>
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </div>
                </a>
            </NavigationMenuLink>
        </li>
    )
}
