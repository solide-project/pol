import Image from "next/image";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface PartnershipsProps extends React.HTMLAttributes<HTMLDivElement> {
}

const partners = [
    { icon: "icons/open-campus.svg", link: "", description: "OC Incubator and Hackathon Winner" },
    { icon: "icons/viction.svg", link: "", description: "Course Partnership" },
    { icon: "icons/apecoin.svg", link: "", description: "Course Partnership" },
    { icon: "icons/campus-arc.svg", link: "", description: "Company Ecosystem Partnership" },
]

export function Partnerships({ }: PartnershipsProps) {
    return <div className="rounded-lg bg-grayscale-050 py-24">
        <h2 className="text-5xl font-semibold text-center">
            Trusted by the most ambitious builders
        </h2>

        <div className="flex items-center justify-center gap-[36px] pt-[60px]">
            {partners.map((partner, index) => (
                <Tooltip key={index}>
                    <TooltipTrigger>
                        <Image src={partner.icon} alt="icon" width={64} height={64} />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{partner.description}</p>
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    </div>
}