"use client"

interface DefinitionProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Definition({ }: DefinitionProps) {
    return <div className="my-10">
        <div className="scroll-m-20 text-4xl font-bold tracking-tight">
            What is Yuzu Points
        </div>
        <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-6">
                <div className="flex items-center justify-center">
                    <img src="/yuzu/coins.svg" className="w-[75%]" alt="logo" />
                </div>
            </div>
            <div className="col-span-12 lg:col-span-6">
                <div className="flex items-center justify-center text-xl h-full w-full lg:w-[80%] my-4 lg:my-0">
                    Yuzu Points are the heart of EDU Chain&apos;s on-chain points system.
                    Yuzu are non-transferable and can only be earned or burned. Earn Yuzu points by completing 
                    fun and engaging content on PoL, then redeem them for $EDU tokens.
                </div>
            </div>
        </div>
    </div>
}