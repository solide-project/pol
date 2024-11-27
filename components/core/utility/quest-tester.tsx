import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getRPC } from "@/lib/chains";
import { getRPC as getMoveRPC } from "@/lib/chains/move/rpc";

import {
    processDeploymentSubmission,
    processDeployTransaction,
    SubmissionReceipt
} from "@/lib/quest/api";
import {
    processDeploymentSubmission as processMoveDeploymentSubmission,
    processDeployTransaction as processMoveDeployTransaction,
} from "@/lib/quest/move-api";

import { SuiClient } from "@mysten/sui/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { createPublicClient, http } from "viem";
import { ChainType } from "./components/select-type";
import { Header } from "./components/header";

interface QuestTesterProps extends React.HTMLAttributes<HTMLDivElement> {
    type: ChainType
}

export function QuestTester({ type }: QuestTesterProps) {
    const [isLoading, setIsLoading] = useState(false)

    const [questInfo, setQuestInfo] = useState<string>("")
    const [value, setValue] = useState<string>("")

    const generateBody = () => ({
        id: "0x" as `0x${string}`,
        transactionHash: value as `0x${string}`,
        user: "0x" as `0x${string}`,
    })

    const generateSubmission = () => {
        try {
            return JSON.parse(questInfo);
        } catch (e: any) {
            throw new Error(`Failed to parse quest: ${e.message}`);
        }
    }

    const handleEVMTest = async () => {
        const body = generateBody()
        const submission: any = generateSubmission()

        const opts: any = {
            testing: true
        }

        const rpc = getRPC(submission.chain)
        const client = createPublicClient({
            transport: http(rpc),
        })

        let reciept: SubmissionReceipt = {
            result: false
        }
        switch (submission.type) {
            case "deployment":
                reciept = await processDeploymentSubmission(client, body, submission, opts)
                if (!reciept.result) throw new Error("Invalid Deployment")
                break;
            default:
                reciept = await processDeployTransaction(client, body, submission, opts)
                if (!reciept.result) throw new Error("Invalid Transaction")
                break;
        }


        if (!reciept.result)
            throw new Error("Invalid Submission")
    }

    const handleMoveTest = async () => {
        const body = generateBody()
        const submission: any = generateSubmission()

        const opts: any = {
            testing: true
        }

        const rpc = getMoveRPC(submission.chain)
        const client = new SuiClient({ url: rpc });

        let reciept: SubmissionReceipt = {
            result: false
        }
        switch (submission.type) {
            case "deployment":
                reciept = await processMoveDeploymentSubmission(client, body, submission, opts)
                if (!reciept.result) throw new Error("Invalid Deployment")
                break;
            default:
                reciept = await processMoveDeployTransaction(client, body, submission, opts)
                if (!reciept.result) throw new Error("Invalid Transaction")
                break;
        }


        if (!reciept.result)
            throw new Error("Invalid Submission")
    }

    const handleTest = async () => {
        try {
            setIsLoading(true)
            type === ChainType.EVM ? await handleEVMTest() : await handleMoveTest()
            toast.success("Success")
        } catch (e: any) {
            toast.error(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    const loadEVMQuest = () => {
        setQuestInfo(JSON.stringify({
            "path": "01_deploy_your_first_token/05_deploy",
            "type": "deployment",
            "chain": "656476",
            "bytecode": "0x86d1b8039b28cf6e8bfbc8ec91d3e4cda65348f689bdc101b1fe39a9f590dcba"
        }, null, 2))
        setValue("0x59fe50b3e2aa15399b2334b5701243ab27b5150aa59f325067a121f80c798409")
    }

    const loadMoveQuest = () => {
        setQuestInfo(JSON.stringify({
            "path": "01_deploy_your_first_token/05_deploy",
            "type": "",
            "chain": "1282977196",
            "bytecode": "0xab1e7fe48a2491a5f6932f8d78b10809f1d70f029a964aa0870daf563748afe7"
        }, null, 2))
        setValue("J83un887QYEidTptqwgVEzWEKzL3zyMw4UBR7ocWsu6G")
    }

    return <>
        <Header title="Quest Tester"
            description="Simulate and test quest configurations" />
        <i>Notes: Testing the quest will not validate the user address. When doing quest on POL, the submissions will validate the user OCID or login address</i>

        <div className="flex items-center gap-2 my-2">
            <div>Load Sample Quest</div>
            <Button onClick={loadEVMQuest} size="sm" variant="ghost">EVM</Button>
            <Button onClick={loadMoveQuest} size="sm" variant="ghost">Move</Button>
        </div>

        <div className="my-2">
            <Textarea onChange={(e) => setQuestInfo(e.target.value)} value={questInfo}
                placeholder="Quest Config" className="h-[256px] my-2" />
            <Input onChange={(e) => setValue(e.target.value)} value={value} placeholder="Transaction Hash" />
        </div>

        <div className="flex flex-col">
            <i>This quest is a {type === ChainType.EVM ? "EVM" : "Move"} type quest</i>
            <Button onClick={handleTest} disabled={isLoading}>
                Submit
            </Button>
        </div>
    </>
}