"use client"

import Image from "next/image"
import { useRouter } from "next/navigation";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Logo({ }: LogoProps) {
    const router = useRouter();

    return (
        <div className="flex items-center space-x-2 hover:cursor-pointer hover:text-primary" onClick={() => router.push("/")}>
            <div>
                <Image src="/badge.svg" height={18} width={18} alt="logo" className="flex shrink-0" />
            </div>
            <div className="text-lg font-semibold hidden md:block">Proof of Learn</div>
        </div>
    )
}