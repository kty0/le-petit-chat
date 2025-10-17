'use client'

import { useEffect, useRef, useState } from "react";



export default function KeyInput() {
    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isSendable, setIsSendable] = useState(false)
    const [saved, setSaved] = useState(false)

    const handleSubmit = () => {
        const val = inputRef.current?.value.trim() ?? "";
        if (!val) return;

        try {
            sessionStorage.setItem("mistral_api_key", val);
            setSaved(true);
        } catch (err) {
            console.error("Failed to save key:", err);
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsSendable(e.target.value.trim().length > 0);
    }

    useEffect(() => {
        if (typeof window === "undefined") return;
        const existing = sessionStorage.getItem("mistral_api_key") ?? "";
        if (inputRef.current) {
            inputRef.current.value = existing;
            setIsSendable(existing.trim().length > 0);
        }
    }, []);

    return (
        <div className="flex flex-col w-full items-center">
            {saved ? <div className="text-red-500 p-4"> Your key is save, you can go back now </div> :
                <form ref={formRef} className="flex min-w-full gap-2 items-end py-4" onSubmit={handleSubmit}>
                    <div className="flex-1 bg-primary text-secondary py-1 px-2 min-h-12 rounded-sm hover:cursor-text content-center">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Enter your Mistral API key"
                            onChange={handleInput}
                            className="w-full bg-transparent outline-none border-none text-sm"
                            autoComplete="off"
                        />
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