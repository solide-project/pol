"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export interface Feature {
    icon: JSX.Element;
    title: string;
    description: string;
}

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
    feature: Feature;
}

export function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={cn(
                "lg:p-12 bg-primary rounded-lg group h-32 flex items-center gap-8 cursor-pointer",
                className
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onFocus={() => setIsHovered(true)}
            onBlur={() => setIsHovered(false)}
            tabIndex={0} // Makes the card focusable for keyboard users
            {...props}
        >
            <div>{feature.icon}</div>
            <div>
                <h3
                    className={cn(
                        "text-2xl font-bold transition-all text-secondary duration-300 ease-in-out tracking-tight my-4 cursor-default",
                        isHovered ? "translate-y-0" : "-my-4 translate-y-4"
                    )}
                >
                    {feature.title}
                </h3>
                <p
                    className={cn(
                        "text-white transition-all duration-300 ease-in-out cursor-default font-medium",
                        isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                >
                    {feature.description}
                </p>
            </div>
        </div>
    );
}
