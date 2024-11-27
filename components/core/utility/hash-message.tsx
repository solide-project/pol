import { Input } from "@/components/ui/input";
import { generateQuestId } from "@/lib/quest";
import { useState } from "react";
import { hashMessage } from "viem";
import { Header } from "./components/header";
import { ChainTypeProps } from "./components/select-type";



interface HashMessageProps extends React.HTMLAttributes<HTMLDivElement>, ChainTypeProps {
}

export function HashMessage({ type }: HashMessageProps) {
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
        <Header title="Quest ID"
            description="Generate the ID for a given resource" />

        <div className="my-2">
            <Input onChange={handleMethod} value={value} placeholder="value" />
            {output && <div>{output}</div>}
        </div>
    </div>
}