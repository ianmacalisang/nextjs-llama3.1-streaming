"use client";
import { useChat } from "ai/react";
import { Bot, Loader2, Send, User2, BrainCircuitIcon } from "lucide-react";
import Markdown from "./component/markdown";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/llm-response",
    });
  return (
    <main className="flex min-h-screen flex-col items-center p-6 text-black bg-slate-900">
      <div className="mb-5 text-center">
        <div className="md:flex md:items-center gap-3">
          <h1 className="text-1xl font-black text-white">ian macalisang</h1>
          <p className="text-sm text-gray-400">
            experimental projects with open-source ai.
          </p>
        </div>
      </div>
      <div className="w-full max-w-3xl rounded-xl p-4">
        {RenderForm()}
        <br />
        {RenderMessages()}
      </div>
      <div className="text-sm text-gray-400 flex gap-2 align-items-center">
        <BrainCircuitIcon size={30} className="mt-1" />
        <div>
          <b>ian macalisang production</b>
          <p className="text-sm text-gray-600">
            model: llama-3.1-70b-versatile
          </p>
        </div>
      </div>
    </main>
  );

  // inner render functions
  function RenderForm() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              prompt: input,
            },
          });
        }}
        className="w-full flex flex-row gap-2 items-center h-full"
      >
        <input
          type="text"
          placeholder={
            isLoading ? "Nag-iisip ng isasagot sayo..." : "Ano kailangan mo?"
          }
          value={input}
          disabled={isLoading}
          onChange={handleInputChange}
          className="w-full rounded-full border py-2 px-4 border-slate-700 bg-slate-700 text-white hover:border-slate-500"
        />
        <button
          type="submit"
          className="rounded-full border shadow-md border-slate-700 flex flex-row bg-slate-700 hover:border-slate-500"
        >
          {isLoading ? (
            <Loader2
              onClick={stop}
              className="p-3 h-10 w-10 animate-spin"
              color="#ffffff"
            />
          ) : (
            <Send className="p-3 h-10 w-10" color="#ffffff" />
          )}
        </button>
      </form>
    );
  }

  function RenderMessages() {
    return (
      <div
        id="chatbox"
        className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap text-overflow-wrap text-sm"
      >
        {messages.map((m, index) => {
          return (
            <div
              key={index}
              className={`p-3 rounded-md ml-8 relative border-l-2 border-slate-400 ${
                m.role === "user"
                  ? "bg-slate-700 text-white"
                  : "bg-slate-800 text-gray-400"
              }`}
            >
              <Markdown text={m.content} />
              {m.role === "user" ? (
                <User2
                  size={35}
                  className="absolute top-1 -left-10  rounded-full p-1"
                />
              ) : (
                <Bot
                  size={35}
                  className={`absolute top-1 -left-10 rounded-full p-1 ${
                    isLoading && index === messages.length - 1
                      ? "animate-bounce"
                      : ""
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
