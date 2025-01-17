import { generateErrorResponse } from "@/lib/api";
import { AnalyticData, ANALYTICS_KEY_TOTAL } from "@/lib/db/analytic";
import { POLMongoService } from "@/lib/util/mongo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const requiredFields = ["address", "owner", "name"] as const;
    for (const field of requiredFields) {
        if (!body[field]) {
            return generateErrorResponse(`Missing or invalid parameter: ${field}`);
        }
    }

    let { address, owner, name } = body as {
        address: `0x${string}`;
        owner: string;
        name: string;
    };

    const service = new POLMongoService();
    await service.connect();
    try {

        const quest = await service.courses?.getByRepo(owner, name);
        if (!quest) return generateErrorResponse("Error fetching quests")

        // From the quests ids in Course, see if users has them
        const query = {
            id: { $in: quest.quests },
            address: { $regex: new RegExp(`^${address}$`, 'i') } // Case-insensitive regex for userID
        };
        const userSubmissions = await service.userSubmissions?.collection.find(query).toArray();

        // Store total transactions
        let value: AnalyticData = await service.analytics?.get(ANALYTICS_KEY_TOTAL) || {
            key: ANALYTICS_KEY_TOTAL,
            value: 0
        }

        value.value += userSubmissions?.length || 0
        await service.analytics?.update((value as any)._id, value)

        // Delete quest. Not needed
        await service.submissions?.collection.deleteMany(query);

        return NextResponse.json({ result: true })
    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json({ message: "Error" }, { status: 400 })
    } finally {
        await service.disconnect();
    }
}