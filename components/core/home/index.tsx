"use client";

import { HeroSection } from "./hero"
import { FeatureSection } from "./features"
import { PartnerSection } from "./partners"
import { CoursesSection } from "./courses"
import { MediaSection } from "./media";

interface HomeProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Home({ }: HomeProps) {
    return <div>
        <div className="mb-16">
            <HeroSection />
        </div>
        <div className="container flex flex-col gap-20">
            <PartnerSection />
            <CoursesSection />

            <FeatureSection />
            <MediaSection />
        </div>
    </div>;
}
