"use client";
import { useChat } from "ai/react";
import { Bot, Loader2, Send, User2 } from "lucide-react";
import Markdown from "./component/markdown";

import logo from "../public/meta-logo-facebook.svg";

import Image from "next/image";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/llm-response",
    });
  return (
    <main className="flex min-h-screen flex-col items-center p-12 text-black bg-slate-100">
      <div className="mb-4 flex flex-row gap-4">
        <div>
          <Image
            src={logo}
            alt="logo"
            width={63}
            height={63}
            className="-mt-1"
          />
        </div>
        <div>
          <h1 className="text-2xl font-black">Ian Macalisang (Experimental)</h1>
          <p>Model: llama-3.1-70b-versatile</p>
        </div>
      </div>
      <div className="w-full max-w-3xl border-gray-200 border-2 rounded-xl bg-white p-5">
        {RenderForm()}
        <br />
        {RenderMessages()}
      </div>
      <div className="text-sm text-gray-500 font-semibold mt-3">
        An Ian Macalisang Production
      </div>
      <p className="text-sm text-gray-500">
        Experimental projects with open-source AI.
      </p>
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
          className="border-b outline-none w-full px-4 py-2 text-[#0842A0] placeholder:text-[#0842A099] focus:placeholder-transparent disabled:bg-transparent"
        />
        <button
          type="submit"
          className="rounded-full shadow-md border flex flex-row"
        >
          {isLoading ? (
            <Loader2
              onClick={stop}
              className="p-3 h-10 w-10 stroke-stone-500 animate-spin"
            />
          ) : (
            <Send className="p-3 h-10 w-10 stroke-stone-500" />
          )}
        </button>
      </form>
    );
  }

  function RenderMessages() {
    return (
      <div
        id="chatbox"
        className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap"
      >
        {messages.map((m, index) => {
          return (
            <div
              key={index}
              className={`p-4 shadow-lg rounded-md ml-10 relative ${
                m.role === "user" ? "bg-slate-100" : ""
              }`}
            >
              <Markdown text={m.content} />
              {m.role === "user" ? (
                <User2
                  size={32}
                  className="absolute top-1 -left-10 border rounded-full p-2 shadow-lg"
                />
              ) : (
                <Bot
                  size={32}
                  className={`absolute top-1 -left-10 border rounded-full p-2 shadow-lg stroke-[#0842A0] ${
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
