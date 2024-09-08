import { Input } from "@/components/ui/input";
import { useState } from "react";
import { sha256 } from "viem";
import { UtilHeader } from "./util-header";

interface Sha256UtilityProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Sha256Utility({ }: Sha256UtilityProps) {
    const [value, setValue] = useState<string>("")
    const [output, setOutput] = useState<string>("")

    const handleMethod = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)

        try {
            const output = sha256(e.target.value as `0x${string}`)
            setOutput(output)
        } catch (error: any) {
            console.error(error)
            setOutput(error.message)
        }
    }
    return <div>
        <UtilHeader title="Bytecode Hash"
            description="Generate the Bytecode Hash for Deployment Quest" />

        <Input onChange={handleMethod} value={value} placeholder="0x" />
        {output && <div>{output}</div>}
    </div>
}