"use client";

import { Badge } from "@/components/ui/badge";
import React from "react";

interface ProfileBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    icon?: React.ReactElement;
}

export function ProfileBadge({ icon, children }: ProfileBadgeProps) {
    return (
        <div className="bg-primary text-white flex items-center space-x-1 rounded-[8px] py-1 px-2">
            {icon && React.cloneElement(icon, { className: "h-4 w-4 shrink-0" })}
            <div>{children}</div>
        </div>
    );
}