'use client';

import clsx from "clsx";
import { useMemo } from "react";

export function TypingIndicator() {
    const phrases = [
        "The tiny cat is licking his paw before answering… 🐾",
        "Le Petit Chat is chasing a thought bubble, give him a sec… 💭",
        "A small meow of concentration is heard… 😺",
        "The cat is stretching before typing back… 💤",
        "He’s cooking up a purrfect reply just for you… 🍳",
        "Le Petit Chat is fluffing his tail and thinking deeply… 🐈‍⬛",
        "One paw on the keyboard… almost there! ⌨️🐾",
        "He’s grooming his code skills right meow… 😸",
    ];

    const text = useMemo(
        () => phrases[Math.floor(Math.random() * phrases.length)],
        []
    );
    return (
        <div
            className={clsx("flex w-full gap-2 justify-start items-center")}
        >
            <img
                src="/le-petit-chat.png"
                alt="assistant avatar"
                className="h-10 w-10 rounded-full self-end"
                loading="lazy"
            />
            <p
                className="
                    text-transparent bg-clip-text 
                    bg-[linear-gradient(90deg,rgba(0,0,0,0.35),rgba(0,0,0,0.9),rgba(0,0,0,0.35))]
                    dark:bg-[linear-gradient(90deg,rgba(255,255,255,0.35),rgba(255,255,255,0.95),rgba(255,255,255,0.35))]
                    bg-[length:200%_100%]
                    animate-[shimmer_2.2s_linear_infinite]
                "
            >
                {text}
            </p>
        </div>
    );
}
