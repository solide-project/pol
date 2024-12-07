import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ExploreHeader } from "./explore-header";
import { ExploreCourse } from "./explore-course";

interface ExploreSectionProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function ExploreSection({ }: ExploreSectionProps) {
    return <div className="">
        <ExploreHeader title="Explore more" />
        <ExploreCourse />
    </div>
}