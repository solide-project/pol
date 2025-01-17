
import { generateErrorResponse } from "@/lib/api";
import { QuestInformation, QuestPagination } from "@/lib/api/pagination";
import { POLMongoService } from "@/lib/util/mongo";
import { getUserInfo } from "@/lib/git/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const page = request.nextUrl.searchParams.get("page")
    if (!page) return generateErrorResponse("Missing page")

    const pageNumber = parseInt(page)
    if (isNaN(pageNumber)) return generateErrorResponse("Invalid page")

    const service = new POLMongoService();
    await service.connectCourse();

    try {
        const total = await service.courses?.collection.countDocuments()
        const quests = await service.courses?.getQuests(pageNumber) || [];

        const result: QuestInformation[] = []
        for (const quest of quests) {
            const user = await getUserInfo(quest.owner);
            const { _id, ...rest } = quest as any; // Exclude _id from mongo
            result.push({
                result: { ...rest },
                user: {
                    image: user?.avatar_url || ""
                }
            })
        }

        return NextResponse.json({
            page: pageNumber,
            pageSize: 25,
            total: total,
            result: result,
        } as QuestPagination)
    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json({ message: error.message }, { status: 400 })
    } finally {
        await service.disconnect();
    }
}