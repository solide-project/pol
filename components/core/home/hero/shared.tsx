export interface TextSwitcher {
    text: string
    colour?: string
    icon?: string
}

export const texts: TextSwitcher[] = [
    {
        text: "Open Campus",
        colour: "#00edbe",
        icon: "icons/open-campus.svg"
    },
    {
        text: "Ape Coin",
        colour: "#002687",
        icon: "icons/apecoin.svg"
    },
    {
        text: "Ethereum",
        colour: "#156fee",
        icon: "icons/eth.svg"
    },
    {
        text: "Uniswap",
        colour: "#FF007A",
        icon: "icons/uniswap.svg"
    },
]