'use server';
import { Msg } from "./_lib/types";

async function callMistral(key: string, messages: Msg[]): Promise<Msg> {
    const apiKey = key; // normally get in db for user
    const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "devstral-small-2507",
            messages: messages.map(m => ({ role: m.role, content: m.content })),
        }),
        cache: "no-store",
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Mistral error: ${res.status} ${text}`);
    }

    const data = await res.json();
    const content: string =
        data?.choices?.[0]?.message?.content ?? "(empty assistant reply)";

    return { role: "assistant", content: content, tool_calls: null };
}

// Use in client component
export async function sendMessage(
    key: string,
    history: Msg[],
    userText: string
): Promise<Msg> {
    const messages: Msg[] = [...history, { role: "user", content: userText }];
    return callMistral(key, messages);
}

export async function getHistory(): Promise<Msg[]> {
    // fetch DB/API here
    return [{ role: "system", content: "Hello! How may I help you ?" }];
}