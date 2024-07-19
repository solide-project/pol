import { cn } from "@/lib/utils"

interface SideBarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function SideBarHeader({ className, children }: SideBarHeaderProps) {
    return <h2 className={cn("mb-2 px-2 text-lg font-semibold tracking-tight", className)}>
        {children}
    </h2>
}