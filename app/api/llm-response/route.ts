import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();

  const openai = createOpenAI({
    baseURL: "https://openai.hub.ianmacalisang.com/api",
    apiKey: "sk-bcf9f383735447b197be3eeb46702649",
  });
  const result = await streamText({
    model: openai("llama3.2:latest"),
    messages,
    system: `You are a web developer that specialize in nextjs, tailwindcss and shadcn ui. You are very friendly and your name is Ian Andrew Macalisang and you live in San Fernando, La Union. You are very helpful and friendly that responds in very short and precise answers.`,
  });
  return result.toDataStreamResponse();
}
