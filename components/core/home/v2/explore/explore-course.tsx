"use client"

import { Button } from "@/components/ui/button";
import { QuestInformation, QuestPagination } from "@/lib/api/pagination";
import Image from "next/image";
import { Key, useEffect, useState } from "react";
import { ResourceCard, ResourceCardSkeleton } from "../../resource-cards";

const loadData = async (): Promise<QuestPagination> => {
    return {
        "page": 1,
        "pageSize": 25,
        "total": 1,
        "result": [
            {
                "result": {
                    // "_id": "67458da00b3e479e5e28d34f",
                    "owner": "polearn",
                    "name": "pol-template",
                    "title": "Deploy Your First Smart Contract on Open Campus",
                    "image": "https://raw.githubusercontent.com/POLearn/pol-template/refs/heads/master/content/assets/cover.png",
                    "description": "This course guides you through deploying your first smart contract on Open Campus. It also serves as a template for creating engaging and user-friendly courses on Proof of Learn.",
                    "tokenId": 0,
                    "quests": [
                        "0x47adb2c901e149511e9386544b80c0c648bac7f19bb37d011d92d1665043020a",
                        "0xec12bcd707bbc3cc19b434e99ccad79aac7ebcee7db8918854a47391177d89d8",
                        "0x11e8d5854e8e2c6bc64c5e131deafe6d368bcff37f9124b2b737f9ada1df3cac"
                    ]
                },
                "user": {
                    "image": "https://avatars.githubusercontent.com/u/183878506?v=4"
                }
            },
            {
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
                    "preview": true
                }
            }
        ]
    }
}

interface ExploreCourseProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function ExploreCourse({ }: ExploreCourseProps) {
    const [quests, setQuests] = useState<QuestInformation[]>([]);

    useEffect(() => {
        (async () => {
            const result = await loadData()
            setQuests(result.result);
        })()
    }, [])

    return <div id="explore" className="grid grid-cols-12 gap-8">
        {quests.map((quest: QuestInformation, index: Key | null | undefined) => (
            <div key={index} className="col-span-12 md:col-span-6 lg:col-span-4 bg-grayscale-025 rounded-lg cursor-pointer group">
                <ResourceCard quest={quest} />
            </div>
        ))}

        {quests.length <= 0 && [1, 2, 3].map((quest) => (
            <div key={quest} className="col-span-12 md:col-span-6 lg:col-span-4 bg-grayscale-025 rounded-lg cursor-pointer group">
                <ResourceCardSkeleton />
            </div>
        ))}
    </div>
}