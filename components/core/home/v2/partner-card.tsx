import Image from "next/image";

interface PartnerCardProps extends React.HTMLAttributes<HTMLDivElement> {
}

const size = 64
const partners = [
    "icons/open-campus.svg",
    "icons/viction.svg"
]
export function PartnerCard({ }: PartnerCardProps) {
    return <div className="rounded-lg bg-grayscale-050 py-24">
        <h2 className="text-5xl font-semibold text-center">
            Trusted by the most ambitious builders
        </h2>

        <div className="flex items-center justify-center gap-4 pt-[60px]">
            {partners.map((p, i) => {
                return <Image key={i} className="ml-[24px]"
                    src={p} alt="icon" width={size} height={size} />
            })}
        </div>
    </div>
}