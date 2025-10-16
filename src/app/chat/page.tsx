import MessageInput from "./_components/messageInput";

export default function ChatPage() {

    return (
        <>
            <div>

                <div className="flex flex-col items-center h-screen p-8">
                    <div className="flex flex-1 h-full">
                        Chat component
                    </div>
                    <MessageInput />
                </div>
            </div>
        </>
    )
}