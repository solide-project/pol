import { selectedNetwork, getContractAddress } from "@/lib/poap";
import { MediaCard } from "@/components/core/home/media/card";
import { Button } from "@/components/ui/button";
import { getExplorer, } from "@/lib/chains";

const explorerPoap = () => {
    "https://educhain.blockscout.com/address/0x7aEb202a1568a80d78A68aA51211cFE3BCD315F9"
    const chainId = selectedNetwork.id.toString()
    const uri = getExplorer(chainId);
    const contractAddress = getContractAddress(chainId)

    return `${uri}/token/${contractAddress}`
}

const items = [
    {
        title: "Follow Us on X",
        description: "Stay updated with the latest news, features, and community events from Proof of Learn.",
        image: "icons/x.svg",
        link: "https://x.com/0xProofOfLearn",
        linkText: "Follow on X"
    },
    {
        title: "Explore on GitHub",
        description: "Discover our open-source projects, contribute to the codebase, and get inspired.",
        image: "icons/github.svg",
        link: "https://github.com/solide-project/pol",
        linkText: "View on GitHub"
    },
    {
        title: "PoL POAP",
        description: "Earn and check out the verified blockchain-verified Proof of Learn contract.",
        image: "icons/contract.svg",
        link: explorerPoap(),
        linkText: "Claim POAP"
    }
];

interface MediaSectionProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function MediaSection({ }: MediaSectionProps) {
    return (
        <div className="rounded-lg bg-secondary lg:px-24 lg:py-16 px-4 py-14">
            <div className="grid grid-cols-12 w-full gap-8">
                <div className="col-span-12 lg:col-span-6">
                    <div className="lg:text-5xl text-3xl font-semibold">
                        Build a course on PoL. We make it easy.</div>
                </div>
                <div className="col-span-12 lg:col-span-6 space-y-4">
                    <div className="text-lg font-medium">
                        Proof of Learn is a Web3 learning platform that transforms education into an interactive,
                        rewarding experience by offering hands-on quests and blockchain-verified credentials.
                        It empowers learners to gain real-world skills, earn NFT achievements, and truly
                        own their accomplishments.
                    </div>
                    <Button variant="primary">Read Docs</Button>
                </div>
            </div>

            <div className="grid grid-cols-12 w-full gap-8 pt-20">
                {items.map((item, index) => (
                    <div key={index} className="col-span-12 lg:col-span-4">
                        <MediaCard title={item.title} description={item.description}
                            image={item.image} link={item.link} linkText={item.linkText} />
                    </div>
                ))}
            </div>
        </div>
    )
}