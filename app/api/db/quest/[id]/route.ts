
import { generateErrorResponse } from "@/lib/api";
import { QuestPagination } from "@/lib/api/pagination";
import { MongoService } from "@/lib/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const { id } = params;

    const tokenId = parseInt(id)
    if (isNaN(tokenId)) return generateErrorResponse("Invalid Token Id")


    const service = new MongoService();
    await service.connect();

    try {
        const quest = await service.quests?.get(tokenId);
        console.log("Quest", tokenId, quest)
        if (!quest) return generateErrorResponse("Error fetching quests")

        return NextResponse.json({
            result: quest,
        })
    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 })
    } finally {
        await service.close();
    }
}