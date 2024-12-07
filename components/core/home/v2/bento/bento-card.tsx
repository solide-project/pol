import { cn } from "@/lib/utils";

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function BentoCard({ className, children }: BentoCardProps) {
    return <div className={cn("rounded-lg bg-primary p-12", className)}>{children}</div>
}