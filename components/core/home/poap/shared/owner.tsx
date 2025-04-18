interface CourseCardOwnerProps {
    owner: string;
    image: string;
}

export function CourseCardOwner({ owner, image }: CourseCardOwnerProps) {
    return (
        <div className="flex items-center gap-4">
            <img
                src={image || "https://avatars.githubusercontent.com/u/183878506?v=4"}
                alt="owner"
                className="rounded-full object-cover h-8 w-8"
            />
            <div className="text-[1rem] max-sm:text-sm">{owner}</div>
        </div>
    );
}
