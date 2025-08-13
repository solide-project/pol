"use client"

const earn = [
    {
        title: "Complete Quests and Courses",
        icon: "🎓",
        description: "Embark on interactive quests designed to teach, challenge, and reward you. Every completed quest earns you Yuzu, helping you progress while learning new skills."
    },
    {
        title: "Social Challenges & Boosts",
        icon: "📲",
        description: "Stay connected by following us on X (Twitter) for weekly challenges and special boost events. Participate to multiply your Yuzu earnings and unlock exclusive bonuses."
    },
    {
        title: "Daily Claim",
        icon: "🍋",
        description: "Keep your streak alive! Claim daily Yuzu by logging in and completing course modules. The more consistent you are, the bigger your rewards grow over time."
    }
]

interface DefinitionProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Definition({ }: DefinitionProps) {
    return <div className="my-10">
        <h2 className="scroll-m-20 text-4xl font-bold tracking-tight my-2">
            Another season, more Yuzu Points
        </h2>
        <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-6 gap-4">
                <div className="flex items-center justify-right">
                    <img src="/yuzu/cover-2.svg" className="w-[90%] rounded-lg" alt="logo" />
                </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
                <ul className="flex flex-col items-center justify-center gap-y-8 mt-4">
                    {earn.map(item => {
                        return (
                            <li key={item.title} className="flex">
                                <div className="mx-4">
                                    {item.icon}
                                </div>
                                <div>
                                    <div className="mb-3 h-5 text-sm font-semibold text-accent-foreground md:text-base">
                                        {item.title}
                                    </div>
                                    <div className="text-sm font-medium text-muted-foreground md:text-base">
                                        {item.description}
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>

                {/* <div className="flex items-center justify-center text-xl h-full w-full lg:w-[80%] my-4 lg:my-0">
                    Yuzu Points are the heart of EDU Chain&apos;s on-chain points system.
                    Earn Yuzu by engaging with our platform. Complete quests, participate in challenges, and 
                    contribute to the community. The more you interact, learn, and share, the more Yuzu you collect, 
                    unlocking exclusive rewards and experiences.
                </div> */}
            </div>
        </div>
    </div>
}