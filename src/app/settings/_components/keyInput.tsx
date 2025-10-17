'use client'

import { useEffect, useRef, useState } from "react";



export default function KeyInput() {
    const divRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isSendable, setIsSendable] = useState(false)
    const [saved, setSaved] = useState(false)

    const handleSubmit = () => {
        if (divRef.current && divRef.current.innerText.trim() !== "") {
            sessionStorage.setItem("mistral_api_key", divRef.current.innerText)
            setSaved(true)
        } else {
            console.log("error")
        }
    }

    const handleInput = () => {

        if (!divRef.current) return;

        setIsSendable(false);
        if (divRef.current && divRef.current.innerText.trim() === "")
            return;
        for (const child of Array.from(divRef.current.childNodes)) {
            if (child.hasChildNodes()) {
                setIsSendable(true);
                break;
            }
        };
    }

    useEffect(() => {
        if (divRef.current && typeof window !== "undefined") {
            divRef.current.innerHTML = `<p class="w-full h-6"">${sessionStorage.getItem("mistral_api_key")}</p>`;
        }
    }, []);

    return (
        <div className="flex flex-col w-full items-center">
            {saved ? <div className="text-red-500 p-4"> Your key is save, you can go back now </div> :
                <form ref={formRef} className="flex min-w-full gap-2 items-end py-4" onSubmit={handleSubmit}>
                    <div className="flex-1 bg-primary text-secondary py-1 px-2 min-h-12 rounded-sm hover:cursor-text content-center">
                        <div ref={divRef}
                            contentEditable="true"
                            onInput={handleInput}
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
            }
        </div>
    );
}