import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getRPC } from "@/lib/chains";
import { processDeploymentSubmission, processDeployTransaction, SubmissionReceipt } from "@/lib/quest/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { createPublicClient, http } from "viem";
import { useAccount } from "wagmi";

interface QuestTestProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function QuestTest({ }: QuestTestProps) {
    const { address } = useAccount()

    const [questInfo, setQuestInfo] = useState<string>("")
    const [value, setValue] = useState<string>("")

    const handleSubmit = async () => {
        if (!address) {
            toast.error("Connect to Metamask")
            return
        }

        const body = {
            id: "0x" as `0x${string}`,
            transactionHash: value as `0x${string}`,
            user: address,
        }

        const submission: any = JSON.parse(questInfo)

        const rpc = getRPC(submission.chain)
        const client = createPublicClient({
            transport: http(rpc),
        })

        let reciept: SubmissionReceipt = {
            result: false
        }
        switch (submission.type) {
            case "deployment":
                reciept = await processDeploymentSubmission(client, body, submission)
                if (!reciept.result) throw new Error("Invalid Deployment")
                break;
            default:
                reciept = await processDeployTransaction(client, body, submission)
                if (!reciept.result) throw new Error("Invalid Transaction")
                break;
        }

        // I don't, just do a san
        if (!reciept.result) {
            toast.error("Invalid Submission")
            return
        }

        toast.success("Success")
    }

    return <>
        <div>Notes: This accounts uses Metamask address as user (NOT OCID)</div>
        <Textarea onChange={(e) => setQuestInfo(e.target.value)} value={questInfo} placeholder="value"
            className="h-[256px]" />

        <Input onChange={(e) => setValue(e.target.value)} value={value} placeholder="value" />

        <Button onClick={handleSubmit}>
            Submit
        </Button>
    </>
}