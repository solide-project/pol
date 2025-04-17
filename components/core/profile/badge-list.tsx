import { Poap } from "@/lib/poap"
import { PoapUserCard } from "./poap-card"

interface BadgeListProps extends React.HTMLAttributes<HTMLDivElement> {
    poaps?: Poap[]
}

export function BadgeList({ poaps = [] }: BadgeListProps) {
    return <>
        <div className="text-4xl leading-[1.1] font-bold my-3">Collection</div>

        {(poaps && poaps.length > 0)
            ? <div className="grid grid-cols-12 gap-4">
                {poaps.map((poap, index) => {
                    return <div key={index} className="col-span-12 lg:col-span-4">
                        <PoapUserCard poap={poap} />
                    </div>
                })}
            </div>
            : <div className="text-center my-4">User has not done any learning</div>}
    </>
}