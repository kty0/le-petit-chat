import { Suspense } from "react";
import ChatProvider from "./_components/chatProvider";
import MessageInput from "./_components/messageInput";
import { getHistory } from "./actions";
import ChatWindows from "./_components/chatWindows";

export default function ChatPage() {
    const initialMessages = getHistory();
    return (
        <>
            <Suspense fallback={<div>Loading chat...</div>}>
                <ChatProvider initialMessages={initialMessages}>
                    <div className="w-screen h-screen py-8 overflow-x-hidden">
                        <ChatWindows />
                        <MessageInput />
                    </div>
                </ChatProvider>
            </Suspense>
        </>
    )
}