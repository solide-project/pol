"use client"

import { QuestInformation } from "@/lib/api/pagination";
import { Key, useEffect, useState } from "react";
import { loadData } from "@/components/core/home/courses/shared";
import { ResourceCard } from "@/components/core/home/courses/card";
import { ResourceCardSkeleton } from "@/components/core/home/courses/card-skeleton";


interface CoursesContentProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function CoursesContent({ }: CoursesContentProps) {
    const [quests, setQuests] = useState<QuestInformation[]>([]);

    useEffect(() => {
        (async () => {
            const result = await loadData()
            setQuests(result.result);
        })()
    }, [])

    return (
        <div id="explore" className="grid grid-cols-12 gap-8">
            {quests.map((quest: QuestInformation, index: Key | null | undefined) => (
                <div key={index} className="col-span-12 md:col-span-6 lg:col-span-4 bg-grayscale-025 rounded-lg cursor-pointer group">
                    <ResourceCard quest={quest} />
                </div>
            ))}

            {quests.length <= 0 && [1, 2, 3].map((quest) => (
                <div key={quest} className="col-span-12 md:col-span-6 lg:col-span-4 bg-grayscale-025 rounded-lg cursor-pointer group">
                    <ResourceCardSkeleton />
                </div>
            ))}
        </div>
    )
}