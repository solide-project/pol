import { CoursesContent } from "@/components/core/home/courses/content";
import { CoursesHeader } from "@/components/core/home/courses/header";

interface CoursesProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Courses({ }: CoursesProps) {
    return (
        <>
            <CoursesHeader title="Explore more" />
            <CoursesContent />
        </>
    )
}