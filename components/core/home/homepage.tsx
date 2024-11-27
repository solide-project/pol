"use client";

import { Feature } from "./feature";
import { Explorer } from "./explorer";
import { Hero } from "./hero";
import CardsStack from "./cards-stack";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";

interface HomePageProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Homepage({ children }: HomePageProps) {
    const router = useRouter()

    return <div>
        <Hero />

        <div className="grid grid-cols-12 gap-8 h-[600px] mb-32 lg:mb-0">
            <div className="col-span-12 lg:col-span-6 flex items-center justify-center">
                <div className="text-center max-w-sm">
                    <div className="text-lg font-light text-foreground">POL POAP</div>
                    <div className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] my-4">
                        Earn and get reward a NFT POAP from POL
                    </div>

                    <Button variant="iconSecondary" size="xl" Icon={ArrowRightIcon}
                        iconPlacement="right" className="my-8 p-6"
                        onClick={() => router.push("/p")}>
                        View Poaps
                    </Button>
                </div>
            </div>
            <div className="col-span-12 lg:col-span-6 flex items-center justify-center">
                <CardsStack />
            </div>
        </div>

        <div className="container mb-64">
            <Feature />
        </div>

        <div className="container mb-64">
            <Explorer />
        </div>
    </div>;
}
