"use client"

import { buttonVariants } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface FaqProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Faq({ }: FaqProps) {
    const { theme } = useTheme()
    return (
        <section className="rounded-lg w-full border my-8">
            <div
                className="bg-cover"
                style={{ backgroundImage: `url("/yuzu/hero-pattern${theme === "dark" ? "-dark" : ""}.svg")` }}
            >
                <div className="grid grid-cols-12 gap-4 py-8 h-full">
                    <div className="col-span-12 lg:col-span-6 flex items-center justify-center mx-8">
                        <div className="">
                            <div className="mt-10 pb-1 text-3xl font-semibold tracking-tight first:mt-0">
                                Earn more Yuzu!
                            </div>
                            <div>
                                Discover even more ways to earn Yuzu! Follow us on X for exciting opportunities to win Yuzu points and exclusive prizes. Don&apos;t miss out—stay connected and start earning!
                            </div>
                            <a
                                className={cn(buttonVariants({ size: "xl" }), "my-4")}
                                href="https://x.com/0xProofOfLearn"
                                target="_blank"
                            >
                                Get Started
                            </a>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-6 order-first lg:order-last">
                        <div className="flex items-center justify-center">
                            <img src="/yuzu/icon.svg" height={123} width={123} alt="logo" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}