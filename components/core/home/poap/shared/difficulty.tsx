import Image from "next/image";

interface CourseCardDifficultyProps {
    difficulty: string;
}

export const getCourseDifficulty = (level: number): string => {
    if (level < 0 || isNaN(level)) return "Unknown";

    if (level <= 5) return "Beginner";
    if (level <= 10) return "Intermediate";

    return "Advanced";
};

export function CourseCardDifficulty({
    difficulty,
}: CourseCardDifficultyProps) {
    return (
        <div className="flex items-center gap-4">
            <Image
                src={`icons/difficulty/${difficulty.toLocaleLowerCase()}.svg`}
                height={24}
                width={24}
                alt="difficulty"
            />
            <div>{difficulty}</div>
        </div>
    );
}
