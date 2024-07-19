
import { generateErrorResponse } from "@/lib/api";
import { MongoService } from "@/lib/db/client";
import { SubmissionResponse } from "@/lib/db/mongo-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id")
    if (!id) return generateErrorResponse("Missing id")

    const service = new MongoService();
    await service.connect();

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
        await service.close();
    }
}