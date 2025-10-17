import { Suspense } from "react";
import ChatProvider from "./_components/chatProvider";
import MessageInput from "./_components/messageInput";
import { getHistory } from "./actions";
import ChatWindows from "./_components/chatWindows";
import Link from "next/link";

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
            <div className="fixed top-8 right-8 h-10 w-10 bg-accent hover:bg-accent-hover p-2 rounded-sm ">
                <Link
                    href="/settings"
                >
                    <img src="settings.png" alt="settings" />
                </Link>
            </div >
        </>
    )
}