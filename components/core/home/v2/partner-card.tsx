import Image from "next/image";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface PartnerCardProps extends React.HTMLAttributes<HTMLDivElement> {
}

const size = 64
const partners = [
    { icon: "icons/open-campus.svg", link: "", description: "OC Incubator and Hackathon Winner" },
    { icon: "icons/viction.svg", link: "", description: "Course Partnership" },
    { icon: "icons/apecoin.svg", link: "", description: "Course Partnership" },
    { icon: "icons/campus-arc.svg", link: "", description: "Company Ecosystem Partnership" },
]
export function PartnerCard({ }: PartnerCardProps) {
    return <div className="rounded-lg bg-grayscale-050 py-24">
        <h2 className="text-5xl font-semibold text-center">
            Trusted by the most ambitious builders
        </h2>

        <div className="flex items-center justify-center gap-[36px] pt-[60px]">
            {partners.map((p, i) => {
                return <Tooltip key={i}>
                    <TooltipTrigger>
                        <Image
                            src={p.icon} alt="icon" width={size} height={size} />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{p.description}</p>
                    </TooltipContent>
                </Tooltip>
            })}
        </div>
    </div>
}