"use client";

import { Hero } from "./hero";
import { PartnerCard } from "./v2/partner-card";
import { FeatureBento } from "./v2/bento/bento";
import { MediaSection } from "./v2/media-section";
import { ExploreSection } from "./v2/explore/explore-section";

interface HomePageProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Homepage({ children }: HomePageProps) {
    return <div>
        <div className="mb-16">
            <Hero />
        </div>
        <div className="container flex flex-col gap-20">
            <FeatureBento />
            <PartnerCard />
            <ExploreSection />
            <MediaSection />
        </div>
    </div>;
}
