interface NavItemData {
    title: string | JSX.Element
    items: NavItemData[] | string
}

export const data: NavItemData[] = [
    {
        title: "Courses",
        items: "/p"
    },
    {
        title: "Creator Platform",
        items: "https://creator.polearn.xyz"
    },
    {
        title: "IDE",
        items: [
            {
                title: "Solidity",
                items: "https://evm.polearn.xyz"
            },
            {
                title: "Stylus",
                items: "https://stylus.polearn.xyz"
            },
            {
                title: "Move",
                items: "https://move.polearn.xyz"
            },
            {
                title: "Soroban",
                items: "https://soroban.polearn.xyz"
            },
            {
                title: "Sway",
                items: "https://sway.polearn.xyz"
            },
            {
                title: "Claride",
                items: "https://clarity.polearn.xyz"
            },
        ]
    },
    {
        title: (
            <div className="flex items-center gap-1">
                <img className="h-5" src="/yuzu/coin.svg" alt="logo" />
                <span className="text-primary">Yuzu</span>
            </div>
        ),
        items: "/yuzu"
    },
]
