interface UtilHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    description?: string
}

export function UtilHeader({ title, description = "" }: UtilHeaderProps) {
    return <div className="mx-auto flex flex-col items-start gap-2 w-full">
        <div className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] hidden md:block">
            {title}
        </div>
        {description &&
            <p className="max-w-2xl text-lg text-foreground">{description}</p>}
    </div>
}