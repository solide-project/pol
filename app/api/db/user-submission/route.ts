
import { generateErrorResponse } from "@/lib/api";
import { MongoService } from "@/lib/db/client";
import { UserSubmissionResponse } from "@/lib/db/mongo-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id")
    if (!id) return generateErrorResponse("Missing id")

    const address = request.nextUrl.searchParams.get("address")
    if (!address) return generateErrorResponse("Missing address")

    const service = new MongoService();
    await service.connect();

    try {
        const submission = await service.userSubmissions?.getUserSubmission(id, address);

        const completed = submission ? true : false
        return NextResponse.json({
            result: {
                ...submission,
                completed
            },
        } as UserSubmissionResponse)
    } catch (error: any) {
        console.error(error.message)
        return generateErrorResponse(error.message.toString())
    } finally {
        await service.close();
    }
}