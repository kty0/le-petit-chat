export type Role = "system" | "user" | "assistant";
export type Msg = { role: Role; content: string; id?: string; tool_calls: ToolCall[] | null };
export type ToolCall = { id: string; type: string, function: FunctionCall, index: number };
export type FunctionCall = { name: string; arguments: string };
