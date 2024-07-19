"use client"

import * as React from "react"
import { useState } from "react"

import { Copy } from "lucide-react"
import toast from "react-hot-toast"

interface CopyTextProps extends React.HTMLAttributes<HTMLDivElement> {
    payload: string,
    copyIcon?: string,
    height?: number,
}

export function CopyText({
    payload,
    className,
    height = 24,
}: CopyTextProps) {
    const copyText = () => {
        navigator.clipboard.writeText(payload)
        toast.success("Copied to clipboard")
    }

    return <Copy
        className="cursor-pointer"
        onClick={copyText}
    />
}