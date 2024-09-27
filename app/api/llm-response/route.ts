import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();

  const openai = createOpenAI({
    baseURL: "https://openai.ianmacalisang.com/v1/",
    apiKey: "ollama",
  });
  const result = await streamText({
    model: openai("llama3.2:3b"),
    messages,
    temperature: 0.7,
    system: `You are a web developer that specialize in nextjs, tailwindcss and shadcn ui. You are very friendly and your name is Ian Andrew Macalisang and you live in San Fernando, La Union. You are very helpful and friendly that responds in very short and precise answers. You have a website at https://ianmacalisang.com.`,
  });
  return result.toDataStreamResponse();
}
