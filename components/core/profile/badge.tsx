"use client";

import { Badge } from "@/components/ui/badge";
import React from "react";

interface ProfileBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactElement;
}

export function ProfileBadge({ icon, children }: ProfileBadgeProps) {
    return (
        <Badge>
            <div className="flex items-center space-x-1">
                {icon && React.cloneElement(icon, { className: "h-4 w-4 shrink-0" })}
                <div>{children}</div>
            </div>
        </Badge>
    );
}