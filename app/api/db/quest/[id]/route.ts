
import { generateErrorResponse } from "@/lib/api";
import { POLMongoService } from "@/lib/util/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    const tokenId = parseInt(id)
    if (isNaN(tokenId)) return generateErrorResponse("Invalid Token Id")


    const service = new POLMongoService();
    await service.connectCourse();

    try {
        const quest = await service.courses?.getByTokenId(tokenId);
        if (!quest) return generateErrorResponse("Error fetching quests")

        return NextResponse.json({
            result: quest,
        })
    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 })
    } finally {
        await service.disconnect();
    }
}