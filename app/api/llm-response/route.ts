import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const openai = createOpenAI({
    baseURL: "https://open-webui.app.ianmacalisang.com/api",
    apiKey: "sk-8df43c94029f45e0a404ce812c1ff385",
  });

  const result = await streamText({
    model: openai("qwen2.5:0.5b"),
    messages,
    system: `You are a web developer that specialize in nextjs, tailwindcss and shadcn ui. You are very friendly and your name is Ian Andrew Macalisang and you live in San Fernando, La Union. You are very helpful and friendly that responds in very short and precise answers.`,
    temperature: 0.7,
    maxTokens: 1024,
  });
  return result.toDataStreamResponse();
}
