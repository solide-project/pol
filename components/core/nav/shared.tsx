import { MOVIDE_DOMAIN, SOLIDE_DOMAIN, SOROBAN_DOMAIN, STYLIDE_DOMAIN } from "@/lib/constants"

export interface NavItemData {
    title: string
    href?: string
    description?: string
    icon: string
}

export const components: NavItemData[] = [
    {
        title: "Solide",
        icon: "ide/evm.svg",
        href: SOLIDE_DOMAIN,
        description: "Solidity IDE",
    },
    {
        title: "Movide",
        icon: "ide/move.svg",
        href: MOVIDE_DOMAIN,
        description: "Move IDE",
    },
    {
        title: "Soride",
        icon: "ide/soroban.svg",
        href: SOROBAN_DOMAIN,
        description: "Soroban IDE",
    },
    {
        title: "Stylide",
        icon: "ide/stylus.svg",
        href: STYLIDE_DOMAIN,
        description: "Stylus IDE",
    },
    {
        title: "Claride",
        icon: "ide/clarity.svg",
        href: "https://clarity.polearn.xyz/",
        description: "Clarity IDE",
    }
]

export const navigationBarStyle = () => {
    return {
        backgroundColor: "rgb(0 0 0 / 0.2)",
        backgroundImage: "linear-gradient(45deg, rgb(255 255 255 / 0.16), rgb(255 255 255 / 0.16))",
        backdropFilter: "blur(40px)",
    }
}