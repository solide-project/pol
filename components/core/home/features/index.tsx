"use client"

import Image from "next/image"

const items = [
    {
        title: "Immersive on-chain education",
        description: "Hands on experience learning with the blockchain is the best way to learn. Show your understanding by completing it",
        image: "icons/feat-block.svg"
    },
    {
        title: "Rewarding Learn & Earn",
        description: "Get rewarded with POL POAP NFT for completing quests and activities",
        image: "icons/feat-hands.svg"
    },
    {
        title: "Free and open source",
        description: "Anyone can deploy an onchain quest and support over 100+ chains and protocols",
        image: "icons/feat-cert.svg"
    }
]

export function FeatureSection({ }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className="grid grid-cols-12 gap-4 h-auto my-8">
            {items.map((item, index) => {
                return (
                    <div key={index} className="col-span-12 lg:col-span-4 p-4 rounded-lg bg-accent text-black">
                        <div className="flex items-center justify-center">
                            <Image src={item.image}
                                className="shrink-0"
                                alt="icon" width={256} height={8} />
                        </div>
                        <div className="p-6">
                            <div className="mb-2 text-2xl font-semibold">{item.title}</div>
                            <div>{item.description}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}