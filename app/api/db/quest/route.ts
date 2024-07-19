
import { generateErrorResponse } from "@/lib/api";
import { QuestPagination } from "@/lib/api/pagination";
import { MongoService } from "@/lib/db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const page = request.nextUrl.searchParams.get("page")
    if (!page) return generateErrorResponse("Missing page")

    const pageNumber = parseInt(page)
    if (isNaN(pageNumber)) return generateErrorResponse("Invalid page")


    const service = new MongoService();
    await service.connect();

    try {
        const total = await service.quests?.collection.countDocuments()
        const quests = await service.quests?.getQuests(pageNumber) || [];

        return NextResponse.json({
            page: pageNumber,
            pageSize: 25,
            total: total,
            result: quests,
        } as QuestPagination)
    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 })
    } finally {
        await service.close();
    }
}