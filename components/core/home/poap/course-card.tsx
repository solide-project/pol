"use client"

import { QuestInformation } from "@/lib/api/pagination"
import { useRouter } from "next/navigation"
import { CourseCardTag } from "./shared/tag"
import { CourseCardDifficulty, getCourseDifficulty } from "./shared/difficulty"
import { CourseCardOwner } from "./shared/owner"

interface PoapCourseCardProps extends React.HTMLAttributes<HTMLDivElement> {
    quest: QuestInformation
}

export function PoapCourseCard({ quest }: PoapCourseCardProps) {
    const router = useRouter()

    const handleCourseClick = () => router.push(`/q/${quest.result.owner}/${quest.result.name}`)

    return <div className="flex overflow-hidden flex-col group cursor-pointer rounded-lg bg-grayscale-025" onClick={handleCourseClick}>
        <div className="relative aspect-[16/9] overflow-hidden">
            <img src={quest.result.image} width={500} height={281} alt="course"
                className="aspect-[16/9] w-full rounded-t-2xl object-cover transition-all group-hover:scale-110" />
            <CourseCardTag className="absolute top-[16px] right-[16px]" >
                {quest.user.minted} POAPs Minted
            </CourseCardTag>
        </div>
        <div className="flex items-center justify-between p-6">
            <CourseCardDifficulty difficulty={getCourseDifficulty(quest.result.quests.length ?? 0)} />
            <CourseCardOwner image={quest.user.image} owner={quest.result.owner} />
        </div>
        <div className="px-6 py-1 flex-1">
            <h1 className="font-sans text-xl font-semibold text-type-1">{quest.result.title}</h1>
            <p className="my-2 h-32 overflow-hidden">{quest.result.description.slice(0, 256)}...</p>
        </div>
    </div>
}