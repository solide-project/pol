"use client";

import { QuestInformation, QuestPagination } from "@/lib/api/pagination";
import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton";
import { ResourceCard, ResourceCardSkeleton } from "./resource-cards";

interface ExplorerProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Explorer({ children }: ExplorerProps) {
    const [page, setPage] = useState(1);
    const [canNext, setCanNext] = useState(false);
    const [quests, setQuests] = useState<QuestInformation[]>([]);

    // Cache the pages we have already searched
    const [data, setData] = useState<{ [key: number]: QuestInformation[] }>({});

    useEffect(() => {
        (async () => {
            if (data[page]) {
                setQuests(data[page]);
                return;
            }

            const response = await fetch(`/api/db/quest?page=${page}`);

            if (!response.ok) {
                console.error("Failed to fetch", response.statusText);
                return;
            }

            const result: QuestPagination = await response.json();
            setQuests(result.result);
            setData({ ...data, [page]: quests });

            const currentTotal = result.page * result.pageSize;
            if (currentTotal >= result.total) {
                setCanNext(false);
            } else {
                setCanNext(true);
            }
        })();
    }, [page]);

    return <>
        <div className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1] my-4">Available & Upcoming Resource</div>
        <div id="explore" className="grid grid-cols-12 gap-8">
            {quests.map((quest, index) => (
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

        {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
        {canNext && <button onClick={() => setPage(page + 1)}>Next</button>}
    </>
}