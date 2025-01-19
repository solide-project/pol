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
        items: "https://creator.solide0x.tech"
    },
    {
        title: "IDE",
        items: [
            {
                title: "Solidity",
                items: "https://solide0x.tech"
            },
            {
                title: "Stylus",
                items: "https://stylus.solide0x.tech"
            },
            {
                title: "Move",
                items: "https://move.solide0x.tech"
            },
            {
                title: "Sway",
                items: "https://sway.solide0x.tech"
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
