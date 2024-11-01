"use client";
import { useChat } from "ai/react";
import { Bot, Loader2, Send, User2, BrainCircuitIcon } from "lucide-react";
import Markdown from "./component/markdown";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/llm-response",
      keepLastMessageOnError: true,
    });
  return (
    <main className="flex min-h-screen justify-center flex-col items-center p-6 text-black bg-slate-900">
      <div className="mb-5 text-center">
        <div className="md:flex md:items-center gap-4">
          <h1 className="text-2xl font-black text-white mb-2 md:mb-0">
            ian
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
              macalisang
            </span>
          </h1>
          <p className="text-sm text-gray-200 font-semibold">
            just another open-source{" "}
            <span className="px-2 py-1 rounded-md bg-gradient-to-r from-blue-600 to-purple-500 font-bold">
              ai model.
            </span>
          </p>
        </div>
      </div>
      <div className="w-full max-w-xl rounded-xl p-4">
        {RenderForm()}
        <br />
        {RenderMessages()}
      </div>
      <div className="text-sm text-gray-400 flex gap-2 align-items-center">
        <BrainCircuitIcon size={30} className="mt-1" />
        <div>
          <b>ian macalisang production.</b>
          <p className="text-[12px] text-gray-600">
            I deploy web applications and internal company software
            <br />
            to automate office task and distribution of sales leads.
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
          placeholder={isLoading ? "is thinking..." : "Let's chat!"}
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
              className={`p-3 rounded-md relative ${
                m.role === "user"
                  ? "bg-slate-700 ml-8 border-l-2 border-blue-600 text-white"
                  : "bg-slate-800 mr-8 border-r-2 border-purple-500 text-gray-400 "
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
                  className={`absolute top-1 -right-10 rounded-full p-1 ${
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
