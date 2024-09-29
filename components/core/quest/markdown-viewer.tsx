"use client"

import React, { useEffect, useState } from "react";
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm"
import remarkFrontmatter from "remark-frontmatter"
import { useQuest } from "@/components/providers/quest-provider";
import { cn } from "@/lib/utils";
import { GithubResolver } from "@resolver-engine/imports/build/resolvers/githubresolver"
import { joinUri } from "@/lib/quest";
import { CodeSnippet } from "../shared/code-snippet";

interface MarkdownViewerProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function MarkdownViewer({ className }: MarkdownViewerProps) {
    const [content, setContent] = useState<string>("")
    const { selectedQuest } = useQuest()

    useEffect(() => {
        (async () => {
            if (!selectedQuest?.name.path) {
                return
            }

            const content = joinUri(selectedQuest?.name.path, "README.md")
            const resolver = GithubResolver()
            const raw = await resolver(content, { resolver: "" }) || ""

            const response = await fetch(raw)
            if (!response.ok) {
                console.error("Failed to fetch", response.statusText)
                setContent("")
                return
            }

            const text = await response.text()
            setContent(text)
        })()
    }, [selectedQuest])

    return <div className={cn("container", className)}>
        {content
            ? <Markdown
                remarkPlugins={[remarkGfm, remarkFrontmatter]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ className, ...props }) => (
                        <h1
                            className={cn(
                                "mb-6 text-[1.5rem] leading-8 font-semibold tracking-tight first:mt-0",
                                className
                            )}
                            {...props}
                        />
                    ),
                    h2: ({ className, ...props }) => (
                        <h2
                            className={cn(
                                "mb-6 text-[1.25rem] leading-7 font-semibold tracking-tight first:mt-0",
                                className
                            )}
                            {...props}
                        />
                    ),
                    h3: ({ className, ...props }) => (
                        <h3
                            className={cn(
                                "mb-6 text-[1.125rem] leading-7 font-semibold tracking-tight",
                                className
                            )}
                            {...props}
                        />
                    ),
                    h4: ({ className, ...props }) => (
                        <h4
                            className={cn(
                                "mb-6 text-[1.0625rem] font-semibold tracking-tight",
                                className
                            )}
                            {...props}
                        />
                    ),
                    h5: ({ className, ...props }) => (
                        <h5
                            className={cn(
                                "mb-6 text-[1rem] font-semibold tracking-tight",
                                className
                            )}
                            {...props}
                        />
                    ),
                    h6: ({ className, ...props }) => (
                        <h6
                            className={cn(
                                "mb-6 text-base font-semibold tracking-tight",
                                className
                            )}
                            {...props}
                        />
                    ),
                    p: ({ className, ...props }) => (
                        <p
                            className={cn("leading-6 mb-6 [&:not(:first-child)]:mt-6", className)}
                            {...props}
                        />
                    ),
                    ul: ({ className, ...props }) => (
                        <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
                    ),
                    ol: ({ className, ...props }) => (
                        <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
                    ),
                    li: ({ className, ...props }) => (
                        <li className={cn("mt-2", className)} {...props} />
                    ),
                    strong: ({ className, ...props }) => (
                        <strong className={cn("text-primary", className)} {...props} />
                    ),
                    hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
                    table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
                        <div className="my-6 w-full overflow-y-auto">
                            <table className={cn("w-full", className)} {...props} />
                        </div>
                    ),
                    tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
                        <tr
                            className={cn("m-0 border-t p-0 even:bg-muted", className)}
                            {...props}
                        />
                    ),
                    th: ({ className, ...props }) => (
                        <th
                            className={cn(
                                "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
                                className
                            )}
                            {...props}
                        />
                    ),
                    td: ({ className, ...props }) => (
                        <td
                            className={cn(
                                "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
                                className
                            )}
                            {...props}
                        />
                    ),
                    code: ({ className, ...props }) => {
                        const { children, node, ...rest } = props
                        const match = /language-(\w+)/.exec(className || "")
                        return match
                            ? <CodeSnippet language={match[1]}>
                                {String(children).replace(/\n$/, "")}
                            </CodeSnippet>
                            : (<code
                                className={cn(
                                    "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
                                    className
                                )}
                                {...props}
                            />)
                    },
                }}>
                {content}
            </Markdown>
            : <div className="h-[80vh] flex items-center justify-center text-center">
                <div>
                    <div>
                        Nothing to see here. Move to the next resource

                    </div>
                    <div>
                        If you think this is a mistake, please do a PR @
                        <a href="#" target="_blank">Here</a>
                    </div>
                </div>
            </div>}
    </div>
}