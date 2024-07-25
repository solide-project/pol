"use client";

import { Feature } from "./feature";
import { Explorer } from "./explorer";
import { Hero } from "./hero";

interface HomePageProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Homepage({ children }: HomePageProps) {
    return <div className="container my-16">
        <Hero />

        <div className="mb-[64px]">
            <Feature />
        </div>

        <div className="mb-32">
            <Explorer />
        </div>
    </div>;
}
