'use client'
import * as React from "react";

export default function MessageInput() {
    const divRef = React.useRef<HTMLDivElement>(null);
    const formRef = React.useRef<HTMLFormElement>(null);

    React.useEffect(() => {
        if (divRef.current) {
            divRef.current.innerHTML = '<p class="w-full h-6" data-placeholder="Type your message..."></p>';
        }
    }, []);

    const handleInput = () => {
        if (!divRef.current) return;
        if (divRef.current.innerHTML.trim() === "") {
            divRef.current.innerHTML = '<p class="w-full h-6" data-placeholder="Type your message..."></p>';
        }
    };

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
        if (!divRef.current) return;
        clearInput();
        fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('mistral_api_key') || ''}`
            },
            body: JSON.stringify({
                model: 'mistral-medium-2508',
                messages: [{ "role": "user", "content": "Hello?" }]
            }),
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data.choices[0].message);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    const clearInput = () => {
        if (divRef.current) {
            divRef.current.innerHTML = '<p class="w-full h-6" data-placeholder="Type your message..."></p>';
        }
    }

    return (
        <form ref={formRef} className="flex gap-2 min-w-1/2 max-w-3/4 items-end" onSubmit={handleSubmit}>
            <div className="flex-1 bg-primary text-secondary py-1 px-2 min-h-12 rounded-sm hover:cursor-text content-center">
                <div ref={divRef}
                    contentEditable="true"
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    className="outline-none border-none"
                >
                </div>
            </div >
            <button className="rounded-sm w-12 bg-accent hover:bg-accent-hover"
                type="submit">
                <img src="/send.png" alt="Send" />
            </button>
        </form>

    );
}