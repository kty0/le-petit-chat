// ChatProvider.tsx
"use client";
import { createContext, useState, use, useCallback, useContext } from "react";
import type { Msg } from "../_lib/types";

type ChatContextType = {
    messages: Msg[];
    append: (m: Msg) => void;
    setMessages: React.Dispatch<React.SetStateAction<Msg[]>>;
    removeLast: () => void;
};

const ChatContext = createContext<ChatContextType | null>(null);

export default function ChatProvider({ initialMessages, children }: {
    initialMessages: Promise<Msg[]>;
    children: React.ReactNode;
}) {
    const [messages, setMessages] = useState<Msg[]>(use(initialMessages));

    const append = useCallback(
        (m: Msg) => setMessages((prev) => [...prev, m]),
        []
    );

    const removeLast = useCallback(() => {
        setMessages((prev) => prev.slice(0, -1));
    }, []);

    return (
        <ChatContext.Provider value={{ messages, append, setMessages, removeLast }}>
            {children}
        </ChatContext.Provider>
    );
}

// le hook
export function useChat() {
    const ctx = useContext(ChatContext);
    if (!ctx) throw new Error("useChat must be used within <ChatProvider>");
    return ctx;
}

