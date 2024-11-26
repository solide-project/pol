
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

        // As POC, just hardcode values, they are stored in but to avoid DB hits for now
        // const quests = [{
        //     owner: '5208980',
        //     name: 'pol-template',
        //     image: 'https://symphony.is/_next/image?url=https%3A%2F%2Fprod-api.symphony.is%2Fassets%2Fartboard-1-29-5.webp&w=3840&q=75',
        //     description: 'This is a template for creating a new learn path',
        //     tokenId: 0,
        //     quests: [
        //         '0x34e93c9c26079dfbe04d2653a2ac42d78661a5348d0462b01bc7838c4d69e207',
        //         '0xa1b976764b4caa3d47cd67e52b8b8a0a600fc2c4155a923f40ef123746cff13f',
        //         '0xf89bd4a878ee31a7d638450be072c851c981f6d00793a0cc3f158da677739aef'
        //     ],
        //     title: 'Solidity Starter (POL Template)'
        // },
        // {
        //     owner: '5208980',
        //     name: 'staking-ape-coin',
        //     title: 'Pratical guide to staking BAYC and Ape Coin',
        //     image: 'https://raw.githubusercontent.com/POLearn/staking-ape-coin/refs/heads/master/content/assets/cover.png',
        //     description: 'A comprehensive guide on how to stake your BAYC and ApeCoin, unlocking rewards and enhancing your participation in the ApeCoin ecosystem.',
        //     tokenId: 1,
        //     quests: [
        //         '0xedfbc2c55ad51d4a58bb316ad60077ffe9bf4bfa6e4c74e5542f71e49fb4de21',
        //         '0x10de6f97dbd3fc132506fca647da45a5c17532686d59666e9289262d5d013834',
        //         '0xd7e2cebda5690fccecaef11846198c8bd137402f9640c602d68b2e405235a38f',
        //         '0x7be6d377226459aba5d18642d761dd8f5ed7a7a40d95aaef4def9be3fe9395f6',
        //         '0x2bf2dbe86a36d1dfbf11d6b42c0f66ed362d55111de4e6e8d178adf929030415'
        //     ]
        // },
        // {
        //     owner: 'POLearn',
        //     name: 'victionary-everything-about-viction',
        //     title: 'Victionary - Everything about Viction',
        //     image: 'https://raw.githubusercontent.com/solide-project/awesome-learn-solidity/master/main/exploring-viction-ecosystem/assets/cover.png',
        //     description: 'A comphresive knowledge hub to learning all about Viction',
        //     tokenId: 2,
        //     quests: [
        //     ]
        // },
        // {
        //     owner: 'POLearn',
        //     name: 'liquidity-pool-on-unichain',
        //     title: 'Create your own liquidity pool on Unichain',
        //     image: 'https://raw.githubusercontent.com/POLearn/liquidity-pool-on-unichain/refs/heads/master/content/assets/cover.png',
        //     "description": "Step-by-step instructions designed to guide users through the process of creating a trading pool on Unichain",
        //     tokenId: 3,
        //     quests: [
        //     ]
        // }]

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

        result.push({
            "result": {
                "owner": "POLearn",
                "name": "victionary-everything-about-viction",
                "title": "Victionary - Everything About Viction",
                "image": "https://raw.githubusercontent.com/solide-project/awesome-learn-solidity/master/main/exploring-viction-ecosystem/assets/cover.png",
                "description": "Comphresion detail and learn about Viction and there ecosystem",
                "tokenId": 2,
                "quests": [
                    "0x832dfd72f0eb507351f09add8585dfa85979e038ddf2e04244966028010236d0",
                    "0xbdf7ff5aa60e31fc422a17a842167785ee37b1fa6d06dc154dbede4c03cdf2ab",
                    "0x5e1ea88dbaa6465a4103b12aa442a98ff6e4f571cd47061d38b841846239084b",
                    "0x528e4bcbe9a5c439adc88805ba9a417e348ada0a0f606dee7c8b5c7ff0491b29",
                    "0xb73d971bf30ed3644c8e9a8022c17fb5a166b02693dbd66b2e86c33190e547f2",
                    "0x177367850d7290a48e45d5e3b078c84c6f428267119f4bbcbee922090ada1a40",
                    "0xf5536b3254cc6ae0dc69c2183b2c67d57c14bee4dd7ae39e9e89d5b385f9a36b"
                ]
            },
            "user": {
                "image": "https://avatars.githubusercontent.com/u/183878506?v=4",
                "preview": true,
            }
        })

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