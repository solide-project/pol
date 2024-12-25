import { cn } from "@/lib/utils";

interface BentoDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function BentoDescription({ className, children }: BentoDescriptionProps) {
    return <div className={cn("text-lg py-8", className)}>{children}</div>
}