'use client'

import clsx from "clsx";
import { Msg } from "../_lib/types";

export function ChatBubble({ message }: { message: Msg }) {

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
                <div className="whitespace-pre-wrap break-words leading-relaxed">{message.content}</div>
                {/* {msg.time && (
                    <div
                        className={clsx(
                            "mt-1 text-[10px] opacity-70 select-none",
                            isUser ? "text-white" : "text-neutral-500 dark:text-neutral-400",
                        )}
                        aria-hidden
                    >
                        {msg.time}
                    </div>
                )} */}
                {/* Tail pointer */}
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