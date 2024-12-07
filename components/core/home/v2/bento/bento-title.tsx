import { cn } from "@/lib/utils";

interface BentoTitleProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function BentoTitle({ className, children }: BentoTitleProps) {
    return <h3 className={cn("text-4xl font-semibold", className)}>{children}</h3>
}