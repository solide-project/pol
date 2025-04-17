import { CoursesHeader } from "./header";
import { QuestInformation } from "@/lib/api/pagination";
import { Key, useEffect, useState } from "react";
import { loadData } from "./shared";
import { PoapCourseCard } from "@/components/core/home/poap/course-card";
import { ResourceCardSkeleton } from "./card-skeleton";

interface CoursesSectionProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function CoursesSection({ }: CoursesSectionProps) {
    const [quests, setQuests] = useState<QuestInformation[]>([]);

    useEffect(() => {
        (async () => {
            const result = await loadData()
            setQuests(result.result);
        })()
    }, [])

    return (
        <>
            <CoursesHeader title="Explore more" />
            <div id="explore" className="grid grid-cols-12 gap-8">
                {quests.map((quest: QuestInformation, index: Key | null | undefined) => (
                    <div key={index} className="col-span-12 md:col-span-6 lg:col-span-4 bg-grayscale-025 rounded-lg cursor-pointer group">
                        <PoapCourseCard quest={quest} />
                    </div>
                ))}

                {
                    quests.length <= 0 &&
                    [1, 2, 3].map((quest) => (
                        <div key={quest} className="col-span-12 md:col-span-6 lg:col-span-4 bg-grayscale-025 rounded-lg cursor-pointer group">
                            <ResourceCardSkeleton />
                        </div>
                    ))}
            </div>
        </>
    )
}