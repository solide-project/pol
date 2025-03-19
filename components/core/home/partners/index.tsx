import Image from "next/image";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface PartnershipsProps extends React.HTMLAttributes<HTMLDivElement> {
}

const partners = [
    {
        icon: "icons/open-campus.svg", link: "https://medium.com/edu-chain/announcing-the-winners-of-edu-chain-hackathon-semester-1-6554808bbf5a",
        description: "PoL emerges victorious in major EDU Chain Hackathon Semester 1 and incuabated with Open Campus Cohort"
    },
    { icon: "icons/viction.svg", link: "", description: "PoL recieve support and course Partnership with Viction" },
    { icon: "icons/apecoin.svg", link: "", description: "PoL recieved Small Grant and support from ApeCoinGWG & Ape Chain" },
    { icon: "icons/campus-arc.svg", link: "https://www.campusarc.com", description: "PoL established Company Ecosystem Partnership with Campus Arc" },
    { icon: "icons/arb.svg", link: "https://x.com/HackQuest_/status/1900759044731912593", description: "PoL won the Arbitrum X EDU Chain Mini-Hack" },
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
                        {partner.link
                            ? <a href={partner.link} target="_blank">
                                <Image src={partner.icon} alt="icon" width={64} height={64} />
                            </a>
                            : <Image src={partner.icon} alt="icon" width={64} height={64} />}

                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{partner.description}</p>
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    </div>
}