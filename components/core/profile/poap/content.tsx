import { epochToFormattedDate, mask } from "@/lib/quest"
import { Calendar, Database, Hash } from "lucide-react"
import { ProfileBadge } from "@/components/core/profile/badge"
import { DialogDescription } from "@/components/ui/dialog"
import { Poap } from "@/lib/poap"

interface PoapContentProps extends React.HTMLAttributes<HTMLDivElement> {
    poap: Poap
}

export function PoapContent({ poap }: PoapContentProps) {
    return (
        <>
            <div className="flex flex-wrap items-center gap-2">
                <ProfileBadge icon={<Hash />}>
                    Token ID: {poap.tokenId.toString()}
                </ProfileBadge>
                {poap.timestamp &&
                    <ProfileBadge icon={<Calendar />}>
                        Minted on: {epochToFormattedDate(Number(poap.timestamp))}
                    </ProfileBadge>}
                <ProfileBadge icon={<Database />}>
                    Token Metadata: {mask(poap.uri.replace("ipfs://", "").toString())}
                </ProfileBadge>
            </div>

            <div>
                <div className="font-semibold">Info</div>
                <DialogDescription className="text-base">{poap.metadata.description}</DialogDescription>
            </div>
        </>
    )
}