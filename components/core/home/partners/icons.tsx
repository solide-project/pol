"use client"

import Image from "next/image"

const items = [
    {
        icon: "icons/open-campus.svg", link: "https://medium.com/edu-chain/announcing-the-winners-of-edu-chain-hackathon-semester-1-6554808bbf5a",
        description: "PoL emerges victorious in major EDU Chain Hackathon Semester 1 and incuabated with Open Campus Cohort"
    },
    { icon: "icons/viction.svg", link: "", description: "PoL recieve support and course Partnership with Viction" },
    { icon: "icons/apecoin.svg", link: "", description: "PoL recieved Small Grant and support from ApeCoinGWG & Ape Chain" },
    { icon: "icons/campus-arc.svg", link: "https://www.campusarc.com", description: "PoL established Company Ecosystem Partnership with Campus Arc" },
    { icon: "icons/arb.svg", link: "https://x.com/HackQuest_/status/1900759044731912593", description: "PoL won the Arbitrum X EDU Chain Mini-Hack" },
]

interface PartnerIconsProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function PartnerIcons({ }: PartnerIconsProps) {
    return (
        <div className="grid grid-cols-12 gap-4 md:gap-8 my-8">
            {items.map((item, index) => {
                return (
                    <div key={index} className="col-span-4">
                        {item.link
                            ? <a href={item.link} target="_blank">
                                <Image src={item.icon} alt="icon" width={8} height={8}
                                    className="hover:cursor-pointer size-[64px]" />
                            </a>
                            : <Image src={item.icon} alt="icon" width={8} height={8}
                                className="hover:cursor-pointer size-[64px]" />}
                    </div>
                )
            })}
        </div>
    )
}