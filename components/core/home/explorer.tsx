"use client";

import { QuestPagination } from "@/lib/api/pagination";
import { QuestSchema } from "@/lib/db/quest";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpRight, Box, GraduationCap, MoveRight, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectBeam } from "./project-beam";

interface ExplorerProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Explorer({ children }: ExplorerProps) {
    const [page, setPage] = useState(1);
    const [canNext, setCanNext] = useState(false);
    const [quests, setQuests] = useState<QuestSchema[]>([]);

    // Cache the pages we have already searched
    const [data, setData] = useState<{ [key: number]: QuestSchema[] }>({});

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
        <div className="text-xl leading-[1.1] sm:text-2xl md:text-4xl text-center font-bold my-8">Explore</div>
        <div id="explore" className="grid grid-cols-12">
            {quests.map((quest, index) => (
                <div key={index} className="col-span-12 md:col-span-6 lg:col-span-3 bg-grayscale-025 rounded-lg cursor-pointer hover:shadow-lg">
                    <img src={quest.image} alt="badge"
                        className="rounded-lg object-cover h-48 w-[100%]" />

                    <div className="py-4 px-3">
                        <h1 className="font-semibold leading-none tracking-tight">{quest.title}</h1>
                        <p className="my-2">{quest.description}</p>
                        <Link className={cn(buttonVariants({ variant: "default" }), "flex items-center gap-2")} href={`/q/${quest.owner}/${quest.name}`}>
                            <div>Start Learning</div>
                            <ArrowUpRight />
                        </Link>
                    </div>
                </div>
            ))}
        </div>

        {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
        {canNext && <button onClick={() => setPage(page + 1)}>Next</button>}
    </>
}