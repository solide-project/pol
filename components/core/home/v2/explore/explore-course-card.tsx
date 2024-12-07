import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ExploreCourseCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
}

export function ExploreCourseCard({ title }: ExploreCourseCardProps) {
    return <div className="flex justify-between items-center w-full">
        <div className="text-5xl font-semibold">
            {title}
        </div>
        <Button variant="outline">
            Explore More
        </Button>
    </div>
}