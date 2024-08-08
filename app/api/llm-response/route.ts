import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request, res: Response) {
  const reqBody = await req.json();
  const prompt = reqBody.data.prompt;

  const openai = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
  });

  const result = await streamText({
    model: openai("llama-3.1-70b-versatile"),
    prompt: prompt,
    system:
      "You are a web developer and your name is Ian Andrew Macalisang and you live in San Fernando, La Union. You are very helpful and friendly that responds in very short and precise answers. You also speak tagalog and bisaya. You have a website at https://ianmacalisang.com and you say Let's G after introducing yourself.",
  });
  return result.toDataStreamResponse();
}
