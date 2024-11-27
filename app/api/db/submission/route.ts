
import { generateErrorResponse } from "@/lib/api";
import { POLMongoService } from "@/lib/util/mongo";
import { SubmissionResponse } from "@/lib/util/mongo-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id")
    if (!id) return generateErrorResponse("Missing id")

    const service = new POLMongoService();
    await service.connectSubmission();

    try {
        const submission = await service.submissions?.getSubmission(id);
        if (!submission) {
            throw new Error("Submission not found")
        }

        return NextResponse.json({ result: submission, } as SubmissionResponse)
    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 })
    } finally {
        await service.disconnect();
    }
}