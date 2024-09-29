"use client"

import React, { } from "react";
import { cn } from "@/lib/utils";

interface IDEViewerProps extends React.HTMLAttributes<HTMLDivElement> {
    uri: string
}

export function IDEViewer({ uri, className }: IDEViewerProps) {
    return <div className={cn("container", className)}>
        <iframe
            className="rounded-lg"
            src={uri}
            width="100%"
            height="500px"
            allow="clipboard-write"
        />
    </div>
}