"use client";

import { Hero } from "./hero";
import { Media } from "./media";
import { Partnerships } from "./partners";
import { Courses } from "./courses";
import { Bento } from "./bento";

interface HomeProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Home({ }: HomeProps) {
    return <div>
        <div className="mb-16">
            <Hero />
        </div>
        <div className="container flex flex-col gap-20">
            <Bento />
            <Partnerships />
            <Courses />
            <Media />
        </div>
    </div>;
}
