"use client"

import { Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"

interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
    payload: string,
    copyIcon?: string,
}

export function CopyText({
    payload,
    className,
}: CopyTextProps) {
    const copyText = () => {
        navigator.clipboard.writeText(payload)
        toast.success("Copied to clipboard")
    }

    return <Copy
        className={cn(className, "cursor-pointer")}
        onClick={copyText}
    />
}