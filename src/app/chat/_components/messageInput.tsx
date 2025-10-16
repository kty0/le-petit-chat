'use client'
import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../actions";
import { useChat } from "./chatProvider";

export default function MessageInput() {
    const divRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isSendable, setIsSendable] = useState(false);
    const [apiKey, setApiKey] = useState<string | null>(null);
    const { append, removeLast, setIsTyping } = useChat();

    useEffect(() => {
        if (typeof window !== "undefined") {
            setApiKey(sessionStorage.getItem("mistral_api_key"));
        }
        if (divRef.current) {
            divRef.current.innerHTML = '<p class="w-full h-6" data-placeholder="Type something… the tiny cat is curious 🐾"></p>';
        }
    }, []);

    const handleInput = () => {

        if (!divRef.current) return;

        if (divRef.current.innerHTML.trim() === "") {
            divRef.current.innerHTML = '<p class="w-full h-6" data-placeholder="Type something… the tiny cat is curious 🐾"></p>';
        }
        setIsSendable(false);
        if (apiKey === null) return;
        for (const child of Array.from(divRef.current.childNodes)) {
            if (child.hasChildNodes()) {
                setIsSendable(true);
                break;
            }
        };
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" && e.shiftKey) {
            e.preventDefault();

            // If the first p is empty, add a <br> to make the placeholder invisible
            if (divRef.current?.firstChild && !divRef.current.firstChild.hasChildNodes()) {
                const emptyP = divRef.current.firstChild;
                const emptyBr = document.createElement("br");
                emptyP.appendChild(emptyBr);
            }

            const p = document.createElement("p");
            const br = document.createElement("br");
            p.appendChild(br)

            const sel = window.getSelection();
            if (!sel || !sel.rangeCount) return;
            const range = sel.getRangeAt(0);

            const currentP = range.startContainer.nodeName === "P" ?
                range.startContainer :
                range.startContainer.parentNode;

            if (!currentP || currentP.nodeName !== "P") return;
            if (!currentP.parentNode) return;

            currentP.parentNode.insertBefore(p, currentP.nextSibling);

            const newRange = document.createRange();
            newRange.setStart(p, 0);
            newRange.setEnd(p, 0);
            sel.removeAllRanges();
            sel.addRange(newRange);
        }

        else if (e.key === "Enter") {
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!divRef.current || !isSendable) return;
        append({ role: "user", content: divRef.current.innerText })
        setIsTyping(true);
        sendMessage(
            apiKey || '',
            [],
            divRef.current.innerText
        ).then(
            res => {
                console.log("Assistant reply:", res);
                append(res);
                setIsTyping(false)
            }
        ).catch(
            err => {
                console.error(err)
                removeLast()
            }
        );
        clearInput();
    }

    const clearInput = () => {
        if (divRef.current) {
            divRef.current.innerHTML = '<p class="w-full h-6" data-placeholder="Type something… the tiny cat is curious 🐾"></p>';
            setIsSendable(false);
        }
    }

    return (
        <div className="fixed w-full flex justify-center bottom-0 bg-white dark:bg-background">
            {!apiKey && <div className="text-red-500 p-4"> Veuillez reseigner votre api key </div>}
            <form ref={formRef} className="flex min-w-1/2 max-w-3/4 gap-2 items-end py-4" onSubmit={handleSubmit}>
                <div className="flex-1 bg-primary text-secondary py-1 px-2 min-h-12 rounded-sm hover:cursor-text content-center">
                    <div ref={divRef}
                        contentEditable="true"
                        onInput={handleInput}
                        onKeyDown={handleKeyDown}
                        className="outline-none border-none"
                    >
                    </div>
                </div >
                <button className="rounded-sm w-12 bg-accent hover:bg-accent-hover disabled:bg-primary disabled:cursor-not-allowed"
                    type="submit"
                    disabled={!isSendable}>
                    <img src="/send.png" alt="Send" />
                </button>
            </form>
        </div>
    );
}