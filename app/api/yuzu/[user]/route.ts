
import { YuzuUserData } from "@/lib/db/yuzu";
import { POLMongoService } from "@/lib/util/mongo";
import { NextRequest, NextResponse } from "next/server";
import { getAddress } from "viem";

// Requires Github owner and name
export async function GET(
    request: NextRequest,
    { params }: { params: { user: `0x${string}` } }
) {
    const { user } = params;
    const address = getAddress(user)
    const service = new POLMongoService();
    await service.connectYuzu();
    try {
        const history = await service.yuzu?.getHistory(address)
        const total = await service.yuzu?.getTotalAddress(address)

        const data = await history?.toArray() as YuzuUserData[]

        return NextResponse.json({
            result: {
                data,
                total
            }
        })
    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json({ message: "Failed to mint for user. If you are sure you completed the all of the quest, then do a PR" }, { status: 400 })
    } finally {
        await service.disconnect();
    }
}
