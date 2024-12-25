
interface PageNotFoundProps extends React.HTMLAttributes<HTMLDivElement> {
    message?: string
}

export function NotFoundProps({ message = "Page not found!" }: PageNotFoundProps) {
    return (
        <div className="flex items-center justify-center h-[90vh]">
            <div className="flex flex-col items-center justify-center w-[25vw]">
                <p className="font-bold text-5xl my-4">
                    404
                </p>
                <p className="text-secondary font-semibold text-xl">
                    {message}
                </p>
            </div>
        </div>
    )
}