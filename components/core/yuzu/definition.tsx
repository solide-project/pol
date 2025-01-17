"use client"

interface DefinitionProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Definition({ }: DefinitionProps) {
    return <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-6">
            <div>
                <img src="/yuzu/coins.svg" alt="logo" />
            </div>
        </div>
        <div className="col-span-12 lg:col-span-6">
            <div className="flex items-center justify-center">
                Yuzu Points are the heart of EDU Chain&apos;s on-chain points system.
                Yuzu are non-transferable and can only be earned or burned.
            </div>
        </div>
    </div>
}