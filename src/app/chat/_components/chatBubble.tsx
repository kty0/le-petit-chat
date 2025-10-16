'use client'

import clsx from "clsx";
import { Msg } from "../_lib/types";
import { remark } from "remark";
import html from 'remark-html';
import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";


export function ChatBubble({ message }: { message: Msg }) {

    const [htmlContent, setHtmlContent] = useState<string | null>(null);

    useEffect(() => {
        const run = async () => {
            const file = await remark()
                .use(remarkGfm)
                .use(html)
                .process(message.content);
            setHtmlContent(String(file));
            console.log(file.toString())
        };
        run();
    }, [])

    const isUser = message.role === 'user';
    return (
        <div
            className={clsx
                (
                    "flex w-full gap-2",
                    isUser ? "justify-end" : "justify-start",
                )}
            role="listitem"
            aria-roledescription="message"
        >
            {!isUser && (
                <img
                    src={"/le-petit-chat.png"}
                    alt="assistant avatar"
                    className="h-10 w-10 rounded-full self-end"
                    loading="lazy"
                />
            )}

            <div
                className={clsx(
                    "relative max-w-[82%] rounded-2xl px-4 py-2 text-sm shadow-sm transition-opacity",
                    isUser
                        ? "bg-primary text-secondary rounded-tr-sm"
                        : "bg-accent text-secondary dark:text-primary rounded-tl-sm",
                )}
            >
                {htmlContent ? (
                    <div
                        className="
              prose prose-sm dark:prose-invert max-w-none
              prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-pre:rounded-md prose-pre:p-3
              prose-code:before:content-[''] prose-code:after:content-['']  /* pas de backticks visuels */
              overflow-x-auto
            "
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                ) : (
                    <div className="whitespace-pre-wrap break-words leading-relaxed">
                        {message.content}
                    </div>
                )}
                <div
                    className={clsx(
                        "absolute -bottom-0.5 h-3 w-3 rotate-45",
                        isUser ? "right-2 bg-primary" : "left-2 bg-accent",
                    )}
                    aria-hidden
                />
            </div>
        </div>
    );
}