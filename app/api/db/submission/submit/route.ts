import { generateErrorResponse, validateSubmitRequest } from "@/lib/api";
import { getRPC } from "@/lib/chains";
import { POLMongoService } from "@/lib/util/mongo";
import {
    processContractData,
    processDeploymentSubmission,
    processDeployTransaction,
    processNativeValueTransaction,
    SubmissionReceipt
} from "@/lib/polearn/core";
import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http } from "viem";

export async function POST(request: NextRequest) {
    // Validate body
    const body = await validateSubmitRequest(await request.json())
    if (typeof body === "string") return generateErrorResponse(body)

    const service = new POLMongoService();
    await service.connectSubmission();
    await service.connectUserSubmission();

    try {
        // First check if user has already completed this quest
        const useSubmission = await service.userSubmissions?.getUserSubmission(body.id, body.user);
        if (useSubmission) return generateErrorResponse("User has already completed this quest")

        // Get the submission if that exists
        const submission = await service.submissions?.getSubmission(body.id)
        if (!submission) return generateErrorResponse("Invalid submission")

        // Set RPC for querying the chain
        const rpc = getRPC(submission.chain)
        const client = createPublicClient({
            transport: http(rpc),
        })

        // Process the submission and get result
        let reciept: SubmissionReceipt = {
            result: false
        }
        switch (submission.type) {
            case "deployment":
                reciept = await processDeploymentSubmission(client, body, submission)
                if (!reciept.result) throw new Error("Invalid Deployment")
                break;
            case "value":
                reciept = await processNativeValueTransaction(client, body, submission)
                if (!reciept.result) throw new Error("Invalid Deployment")
                break;
            case "data":
                reciept = await processContractData(client, body, submission)
                if (!reciept.result) throw new Error("Invalid Contract Value")
                break;
            default:
                reciept = await processDeployTransaction(client, body, submission)
                if (!reciept.result) throw new Error("Invalid Transaction")
                break;
        }

        if (!reciept.result) throw new Error("Invalid Submission")

        // Save information as UserSubmission
        const result = await service.userSubmissions?.insert({
            id: body.id,
            address: body.user,
            txHash: body.transactionHash,
        })

        return NextResponse.json({ result: body, submission })
    } catch (error: any) {
        console.error(error.message)
        return generateErrorResponse(error.message.toString())
    } finally {
        await service.disconnect();
    }
}

