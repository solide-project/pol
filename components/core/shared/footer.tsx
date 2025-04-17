"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { getContractAddress, selectedNetwork } from "@/lib/poap";
import { getExplorer } from "@/lib/chains";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const items = [
    {
        icon: "bluesky",
        href: `${getExplorer(selectedNetwork.id.toString())}/address/${getContractAddress(selectedNetwork.id.toString())}`,
        text: "Bluesky",
    },
    {
        icon: "contract",
        href: `${getExplorer(selectedNetwork.id.toString())}/address/${getContractAddress(selectedNetwork.id.toString())}`,
        text: "EDU Chain POAP Contract",
    },
    {
        icon: "github",
        href: "https://github.com/solide-project",
        text: "Found a bug? New feature? Check out our GitHub",
    },
    {
        icon: "linktree",
        href: "https://linktr.ee/proofoflearn",
        text: "Linktree",
    },
    {
        icon: "x",
        href: "hhttps://x.com/0xProofOfLearn",
        text: "X (Formerly Twitter)",
    },
];

export function Footer({}: FooterProps) {
    const { theme } = useTheme();
    const [mode, setMode] = useState("dark");

    useEffect(() => {
        setMode(theme === "dark" ? "dark" : "light");
    }, []);

    useEffect(() => {
        setMode(theme === "dark" ? "dark" : "light");
    }, [theme]);

    return (
        <div
            className="px-8 py-4 flex items-center justify-between rounded-[16px] z-50 mx-4 my-2 mt-8"
            style={{
                backgroundColor: "rgb(0 0 0 / 0.2)",
                backgroundImage:
                    "linear-gradient(45deg, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.16))",
                backdropFilter: "blur(40px)",
            }}
        >
            <div> </div>
            <div className="flex items-center space-x-1 md:space-x-4">
                {items.map((item, index) => {
                    return (
                        <Tooltip key={index}>
                            <TooltipTrigger asChild>
                                <a
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Image
                                        src={`/icons/logo/${item.icon}-${mode}.svg`}
                                        height={18}
                                        width={18}
                                        alt="logo"
                                        className="flex shrink-0"
                                    />
                                </a>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{item.text}</p>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>
        </div>
    );
}
