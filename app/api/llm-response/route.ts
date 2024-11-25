import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error("Invalid or empty messages format:", messages);
      return NextResponse.json(
        { error: "Invalid or empty messages format. Messages must be a non-empty array." },
        { status: 400 }
      );
    }

    const openai = createOpenAI({
      baseURL: "https://hq.ianmacalisang.com/api",
      apiKey: "sk-7df69cb0e9604ac680871da57cdd5e8f",
    });

    console.log("Sending request to AnythingLLM with messages:", messages);

    // Stream text generation from AnythingLLM
    const result = await streamText({
      model: openai("llama-3.1-70b-versatile"), // Specify the model correctly here
      messages,
    });

    // Convert result to a data stream response
    const response = result.toDataStreamResponse();

    // Log success
    console.log("Successfully processed messages:", messages);

    return response;
  } catch (error: unknown) {
    console.error("Error in processing request:", error);

    // Enhanced error handling with type-checking for Error objects
    const errorMessage = error instanceof Error ? error.message : String(error);

    return NextResponse.json(
      {
        error: "Failed to process request",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
