"use client";

import { QuestPagination } from "@/lib/api/pagination";
import { QuestSchema } from "@/lib/db/quest";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HomePageProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Homepage({ children }: HomePageProps) {
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

    return <div className="">
        {quests.map((quest, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <img src={quest.image} alt="badge" width={270} height={270} />

                <h1>{quest.name}</h1>
                <p>{quest.description}</p>
                <Link href={`/q/${quest.owner}/${quest.name}`}>
                    Start Learning
                </Link>
            </div>
        ))}

        {page > 1 && <button onClick={() => setPage(page - 1)}>Previous</button>}
        {canNext && <button onClick={() => setPage(page + 1)}>Next</button>}
    </div>;
}
