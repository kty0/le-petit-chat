'use client'

import { ChatBubble } from "./chatBubble"
import { useChat } from "./chatProvider";
import { TypingIndicator } from "./typingIndicator";

export default function ChatWindows() {
    const { messages, isTyping } = useChat();
    return (
        <div className="flex flex-col gap-4 flex-1 max-w-3/4 m-auto pb-16">
            {messages.map((m, idx) => (
                <ChatBubble
                    key={m.id ?? `msg-${idx}-${Date.now()}`}
                    message={{ ...m, id: m.id ?? `msg-${idx}-${Date.now()}` }}
                />
            ))}
            {isTyping && <TypingIndicator />}
        </div>
    );
}