
import { generateErrorResponse } from "@/lib/api";
import { QuestInformation, QuestPagination } from "@/lib/api/pagination";
import { MongoService } from "@/lib/db/client";
import { getUserInfo } from "@/lib/git/user";
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
        // const quests = await service.quests?.getQuests(pageNumber) || [];
        const quests = [{
            owner: '5208980',
            name: 'pol-template',
            image: 'https://symphony.is/_next/image?url=https%3A%2F%2Fprod-api.symphony.is%2Fassets%2Fartboard-1-29-5.webp&w=3840&q=75',
            description: 'This is a template for creating a new learn path',
            tokenId: 0,
            quests: [
                '0x34e93c9c26079dfbe04d2653a2ac42d78661a5348d0462b01bc7838c4d69e207',
                '0xa1b976764b4caa3d47cd67e52b8b8a0a600fc2c4155a923f40ef123746cff13f',
                '0xf89bd4a878ee31a7d638450be072c851c981f6d00793a0cc3f158da677739aef'
            ],
            title: 'Solidity Starter (POL Template)'
        },
        {
            owner: '5208980',
            name: 'staking-ape-coin',
            title: 'Pratical guide to staking BAYC and Ape Coin',
            image: 'https://global.discourse-cdn.com/apecoin/original/2X/0/0e5af9557297fdc250b3a34b8162c0a9f1366a68.jpeg',
            description: 'A comprehensive guide on how to stake your BAYC and ApeCoin, unlocking rewards and enhancing your participation in the ApeCoin ecosystem.',
            tokenId: 1,
            quests: [
                '0xedfbc2c55ad51d4a58bb316ad60077ffe9bf4bfa6e4c74e5542f71e49fb4de21',
                '0x10de6f97dbd3fc132506fca647da45a5c17532686d59666e9289262d5d013834',
                '0xd7e2cebda5690fccecaef11846198c8bd137402f9640c602d68b2e405235a38f',
                '0x7be6d377226459aba5d18642d761dd8f5ed7a7a40d95aaef4def9be3fe9395f6',
                '0x2bf2dbe86a36d1dfbf11d6b42c0f66ed362d55111de4e6e8d178adf929030415'
            ]
        }]

        const result: QuestInformation[] = []
        for (const quest of quests) {
            const user = await getUserInfo(quest.owner);
            result.push({
                result: { ...quest },
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
        await service.close();
    }
}