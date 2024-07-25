"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { ProjectBeam } from "./project-beam";

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Hero({ children }: HeroProps) {
    return <div className="h-[100vh]">
        <div>
            <a href="" rel="noopener noreferrer" target="_blank"
                className="flex items-center justify-center my-4">
                <div className="border border-gray py-1 md:py-[4px] px-3 rounded-full bg-grayscale-025 text-center flex items-center space-x-2">
                    <span>🎖️ Participating in EDU Chain</span>
                    <MoveRight />
                </div>
            </a>

            <div className="font-heading text-5xl md:text-6xl lg:text-7xl mb-8 md:mb-16">
                Learn from any chain, protocol, ecosystem. Earn on Open Campus</div>
        </div>

        <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-4">
                <div className="flex items-center justify-center gap-2 my-8 md:my-0 h-[100%]" >
                    <a href="#explore" className={buttonVariants({ variant: "default" })}>Start Learning</a>
                    <Button variant="secondary">View Poaps</Button>
                </div>
            </div>
            <div className="col-span-12 md:col-span-8">
                <ProjectBeam />
            </div>
        </div>
    </div>
}