import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CoursesHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
}

export function CoursesHeader({ title }: CoursesHeaderProps) {
    const router = useRouter()

    return (
        <div className="flex justify-between items-center w-full">
            <div className="text-5xl font-semibold">
                {title}
            </div>
            <Button variant="outline" onClick={() => router.push(`/p`)}>
                Explore More
            </Button>
        </div>
    )
}