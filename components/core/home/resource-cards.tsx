"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { QuestInformation } from "@/lib/api/pagination"
import { useRouter } from "next/navigation"

interface ResourceCardProps extends React.HTMLAttributes<HTMLDivElement> {
    quest: QuestInformation
}
export function ResourceCard({ quest }: ResourceCardProps) {
    const router = useRouter()

    return <div className="p-3" onClick={() => router.push(`/q/${quest.result.owner}/${quest.result.name}`)}>
        <div className="flex items-center gap-4">
            <img src={quest.user.image} alt="owner"
                className="rounded-full object-cover h-8 w-8" />
            <div className="text-[1rem] max-sm:text-sm">{quest.result.owner}</div>
        </div>

        <img src={quest.result.image} alt="badge"
            className="rounded-lg h-[240px] w-[100%] aspect-[1.91/1] object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105 my-4" />

        <div className="my-2">
            <h1 className="font-sans text-xl font-semibold text-type-1">{quest.result.title}</h1>
            {/* <p className="my-2 h-32 overflow-hidden">{resource.result.description}</p> */}
        </div>
    </div>
}

export function ResourceCardSkeleton() {
    return <div className="p-3">
        <div className="flex items-center gap-4">
            <Skeleton className="rounded-full object-cover h-8 w-8" />
            <Skeleton className="h-6 w-[250px]" />
        </div>

        <Skeleton
            className="rounded-lg h-[240px] w-[100%] my-4" />

        <div className="my-2">
            <Skeleton className="h-14 w-full" />
        </div>
    </div>
}