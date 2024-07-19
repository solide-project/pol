import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { validate } from "@/lib/quest/validate";
import { convertImportToMongo } from "@/lib/quest/converter";

interface QuestValidatorProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function QuestValidator({ }: QuestValidatorProps) {
    const [value, setValue] = useState<string>(`
{
    "metadata": {
        "owner": "5208980",
        "name": "ape-quest",
        "chain": "84532"
    },
    "quests": [
        {
            "path": "01_ape_coin",
            "type": "transaction",
            "chain": "11155111",
            "contract": "0x755457DBC2aAa7568169C58942755c8Bf2b406d1",
            "abi": ["function mint(address to, uint256 amount)"],
        }
    ]
}
        `.trim())

    const [output, setOutput] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const handleMethod = async () => {
        try {
            setLoading(true)
            setOutput("")

            const submissionItems = convertImportToMongo(validate(value))

            setOutput(JSON.stringify(submissionItems, null, 2))
        } catch (error: any) {
            console.error(error)
            setOutput(error.message)
        } finally {
            setLoading(false)
        }
    }

    const [storeLoading, setStoreLoading] = useState<boolean>(false)
    const storeSubmissionQuest = async () => {
        try {
            setStoreLoading(true)
            setOutput("")

            const response = await fetch("/api/db/submission/store", {
                method: "POST",
                body: JSON.stringify({ data: value }),
            })

            const data = await response.json()
            console.log(data)

            setOutput(JSON.stringify(data, null, 2))
        } catch (error: any) {
            console.error(error)
            setOutput(error.message)
        } finally {
            setStoreLoading(false)
        }
    }

    return <div>
        <Textarea onChange={(e) => setValue(e.target.value)} value={value} placeholder="value"
            className="h-[256px]" />
        <Button onClick={handleMethod} disabled={loading}>{loading ? "Validating..." : "Validate"}</Button>
        <Button onClick={storeSubmissionQuest} disabled={storeLoading}>{storeLoading ? "Storing..." : "Store"}</Button>

        {output && <div>{output}</div>}
    </div>
}