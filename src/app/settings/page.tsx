import Link from "next/link";
import KeyInput from "./_components/keyInput";

export default function SettingsPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-primary text-foreground px-4">
            <div className="w-full max-w-md bg-white dark:bg-background border border-accent shadow-accent-active rounded-2xl p-6">
                <div>
                    <Link href="/chat"><img src="/back.svg" alt="back to the chat" className="h-6 w-6 invert-0 dark:invert" /></Link>
                </div>
                <h1 className="text-2xl font-semibold mb-2 text-center">
                    🔑 API Key Settings
                </h1>
                <p className="text-sm text-center text-foreground/70 mb-6">
                    Enter your Mistral API key below to let <strong>Le Petit Chat</strong> work his magic 🐾
                </p>

                <div className="space-y-4">
                    <KeyInput />
                    <div className="text-xs text-center text-foreground/50">
                        Your key is stored locally using <strong>sessionStorage</strong> — never shared.
                    </div>
                </div>
            </div>
        </div>
    );
}