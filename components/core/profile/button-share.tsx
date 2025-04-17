import { Poap } from "@/lib/poap"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/core/shared/icons"

interface PoapShareButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    poap: Poap
}

export function PoapShareButton({ poap }: PoapShareButtonProps) {
    const generateTweet = (title: string) => {
        const uri = "https://twitter.com/intent/tweet"
        const text = `I completed the ${title} on Proof of Learn and earn a Poap!`
        const url = `https://opencampus-codex.blockscout.com/token/0x9B6089b63BEb5812c388Df6cb3419490b4DF4d54/instance/${poap.tokenId.toString()}`
        return `${uri}?text=${text}&url=${url}`
    }

    return (
        <>
            <a className={`${buttonVariants({ variant: "outline" })} flex items-center gap-2`}
                target="_blank" rel="noopener noreferrer"
                href={generateTweet(poap.metadata.name)}>
                <div>Share</div>
                <Icons.x className="h-4 w-4" />
            </a>
        </>
    )
}