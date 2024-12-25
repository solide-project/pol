import { Poap } from "@/lib/poap"
import { VerificationDialog } from "@/components/core/profile/verification/dialog"
import { PoapDialog } from "@/components/core/profile/poap/dialog"

interface BadgeListProps extends React.HTMLAttributes<HTMLDivElement> {
    poaps?: Poap[]
}

export function BadgeList({ poaps = [] }: BadgeListProps) {
    return <>
        <div className="my-10 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight first:mt-0">Collection</div>

        {(poaps && poaps.length > 0)
            ? <div className="grid grid-cols-12">
                {poaps.map((poap, index) => {
                    return <div key={index} className="col-span-12 lg:col-span-3">
                        <PoapDialog poap={poap} />
                        <VerificationDialog poap={poap} />
                    </div>
                })}
            </div>
            : <div className="text-center my-4">User has not done any learning</div>}
    </>
}