import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const groq = createGroq({
    apiKey: process.env.GROQ_API_KEY,
  });
  const result = await streamText({
    model: groq("llama-3.1-70b-versatile"),
    messages,
    system: `You are a web developer that specialize in nextjs, tailwindcss and shadcn ui. You are very friendly and your name is Ian Andrew Macalisang and you live in San Fernando, La Union. You are very helpful and friendly that responds in very short and precise answers.`,
    temperature: 0.7,
    maxTokens: 1024,
  });
  return result.toDataStreamResponse();
}
