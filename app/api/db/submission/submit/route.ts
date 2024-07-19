import { generateErrorResponse, validateSubmitRequest } from "@/lib/api";
import { getRPC } from "@/lib/chains";
import { MongoService } from "@/lib/db/client";
import { processDeploymentSubmission, processDeployTransaction, SubmissionBody, SubmissionReceipt } from "@/lib/quest/api";
import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { resourceLimits } from "worker_threads";

export async function POST(request: NextRequest) {
    // Validate body
    const body = await validateSubmitRequest(await request.json())
    if (typeof body === "string") return generateErrorResponse(body)

    const service = new MongoService();
    await service.connect();

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
            default:
                reciept = await processDeployTransaction(client, body, submission)
                if (!reciept.result) throw new Error("Invalid Transaction")
                break;
        }

        // I don't, just do a san
        if (!reciept.result) throw new Error("Invalid Submission")

        // Save information as UserSubmission
        const result = await service.userSubmissions?.save({
            id: body.id,
            address: body.user,
            txHash: body.transactionHash,
        })

        console.log("User Submission", result)
        return NextResponse.json({ result: body, submission })
    } catch (error: any) {
        console.error(error.message)
        return generateErrorResponse(error.message.toString())
    } finally {
        await service.close();
    }
}

