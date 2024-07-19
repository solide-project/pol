import { Input } from "@/components/ui/input";
import { generateQuestId } from "@/lib/quest";
import { useState } from "react";
import { hashMessage } from "viem";

interface HashMessageProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function HashMessage({ }: HashMessageProps) {
    const [value, setValue] = useState<string>("")
    const [output, setOutput] = useState<string>("")

    const handleMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)

        try {
            const output = generateQuestId(e.target.value)
            setOutput(output)
        } catch (error: any) {
            console.error(error)
            setOutput(error.message)
        }
    }
    return <div>
        <Input onChange={handleMethod} value={value} placeholder="value" />
        {output && <div>{output}</div>}
    </div>
}