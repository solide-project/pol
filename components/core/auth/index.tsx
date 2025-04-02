"use client";

import { Button } from "@/components/ui/button";
import { StellarLogo } from "./icons/stellar";

interface AuthProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Auth({ }: AuthProps) {
    return (
        <Button className="bg-white text-black border border-gray-200 gap-2">
            <StellarLogo className="h-6 shrink-0"/>
            Connect with Stellar
        </Button>
    )
}
