import { cn } from "@/lib/utils";

interface CourseCardTagProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CourseCardTag({
    className,
    children,
    ...props
}: CourseCardTagProps) {
    return (
        <div
            className={cn(
                "rounded-[16px] bg-secondary px-2 py-1 font-medium text-black",
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
