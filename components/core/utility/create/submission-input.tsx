import { Input } from "@/components/ui/input";

interface SubmissionInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string,
}

export function SubmissionInput({ title, ...props }: SubmissionInputProps) {
    return <div className="flex items-center gap-2">
        <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {title}
        </div>
        <Input className="h-8" {...props} />
    </div>
}