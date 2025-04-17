import { Skeleton } from "@/components/ui/skeleton"

export function ResourceCardSkeleton() {
    return (
        <div className="flex overflow-hidden flex-col group cursor-pointer rounded-lg bg-grayscale-025">
            <div className="relative aspect-[16/9] overflow-hidden">
                <Skeleton className="h-full w-[100%]" />
            </div>
            <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-6 w-[128px]" />
                </div>
                <div className="flex items-center gap-4">
                    <div>
                        <Skeleton className="rounded-full object-cover h-8 w-8" />
                    </div>
                    <Skeleton className="h-6 w-[96px]" />
                </div>
            </div>
            <div className="px-6 py-1 flex-1">
                <Skeleton className="h-[126px] w-full" />
            </div>
        </div>
    )
}