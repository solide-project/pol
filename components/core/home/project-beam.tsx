"use client";

import React, { forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import Image from "next/image";

const Circle = forwardRef<
    HTMLDivElement,
    { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 border-gray",
                className,
            )}
        >
            {children}
        </div>
    );
});

Circle.displayName = "Circle";

export function ProjectBeam() {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);
    const div3Ref = useRef<HTMLDivElement>(null);
    const div4Ref = useRef<HTMLDivElement>(null);
    const div5Ref = useRef<HTMLDivElement>(null);
    const div6Ref = useRef<HTMLDivElement>(null);
    const div7Ref = useRef<HTMLDivElement>(null);

    return (
        <div
            className="relative flex w-full items-center justify-center overflow-hidden"
            ref={containerRef}
        >
            <div className="flex size-full flex-col max-w-lg items-stretch justify-between gap-10">
                <div className="flex flex-row items-center justify-between">
                    <Circle ref={div1Ref} className="bg-grayscale-025">
                        <Image src="icons/arb.svg" alt="arb" style={{ scale: "1.3" }} width={36} height={36} />
                    </Circle>
                    <Circle ref={div5Ref} className="bg-grayscale-025">
                        <Image src="icons/eth.svg" alt="eth" style={{ scale: "2.1" }} width={36} height={36} />
                    </Circle>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <Circle ref={div2Ref} className="bg-grayscale-025">
                        <Image src="icons/uniswap.svg" alt="uniswap" width={40} height={40} />
                    </Circle>
                    <Circle ref={div4Ref} className="size-18 gap-3">
                        <Image src="icons/open-campus.svg" alt="open-campus" width={40} height={40} />
                        <Image src="/badge.svg" alt="pol" width={32} height={32} />
                    </Circle>
                    <Circle ref={div6Ref} className="bg-grayscale-025">
                        <Image src="icons/apecoin.svg" alt="apecoin" style={{ scale: "1.3" }} width={49} height={49} />
                    </Circle>
                </div>
                <div className="flex flex-row items-center justify-between">
                    <Circle ref={div3Ref} className="bg-grayscale-025">
                        <Image src="icons/open-campus.svg" alt="open-campus" style={{ scale: "1.2" }} width={40} height={40} />
                    </Circle>
                    <Circle ref={div7Ref} className="bg-grayscale-025">
                        <Image src="icons/matic.svg" alt="matic" style={{ scale: "1.2" }} width={40} height={40} />
                    </Circle>
                </div>
            </div>

            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div4Ref}
                curvature={-75}
                endYOffset={-10}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div2Ref}
                toRef={div4Ref}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div3Ref}
                toRef={div4Ref}
                curvature={75}
                endYOffset={10}
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div5Ref}
                toRef={div4Ref}
                curvature={-75}
                endYOffset={-10}
                reverse
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div6Ref}
                toRef={div4Ref}
                reverse
            />
            <AnimatedBeam
                containerRef={containerRef}
                fromRef={div7Ref}
                toRef={div4Ref}
                curvature={75}
                endYOffset={10}
                reverse
            />
        </div>
    );
}