import { Skeleton } from "@/components/ui/skeleton"

export function ResourceCardSkeleton() {
    return (
        <div className="p-3">
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
    )
}