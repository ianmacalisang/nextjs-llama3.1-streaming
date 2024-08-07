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
    <main className="flex min-h-screen flex-col items-center p-6 text-black bg-slate-900">
      <div className="mb-4 text-center">
        <div className="md:flex md:items-center gap-3">
          <h1 className="text-1xl font-black text-white">ian macalisang</h1>
          <p className="text-sm text-gray-400">
            experimental projects with open-source ai.
          </p>
        </div>
      </div>
      <div className="w-full max-w-3xl rounded-xl bg-slate-800 p-6">
        {RenderForm()}
        <br />
        {RenderMessages()}
      </div>
      <div className="text-sm text-gray-400 font-semibold mt-3">
        an ian macalisang production
      </div>
      <p className="text-sm text-gray-600">model: llama-3.1-70b-versatile</p>
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
          className="w-full rounded-full border py-2 px-4 border-slate-700 bg-slate-700 text-white"
        />
        <button
          type="submit"
          className="rounded-full border shadow-md border-slate-700 flex flex-row bg-slate-700"
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
        className="flex flex-col-reverse w-full text-left mt-4 gap-4 whitespace-pre-wrap text-overflow-wrap text-md"
      >
        {messages.map((m, index) => {
          return (
            <div
              key={index}
              className={`p-3 rounded-md ml-10 relative border-l-2 border-slate-400 ${
                m.role === "user"
                  ? "bg-slate-600 text-white"
                  : "bg-slate-700 text-gray-400"
              }`}
            >
              <Markdown text={m.content} />
              {m.role === "user" ? (
                <User2
                  size={35}
                  className="bg-slate-700 absolute top-1 -left-10  rounded-full p-2"
                />
              ) : (
                <Bot
                  size={35}
                  className={`bg-slate-700 absolute top-1 -left-10 rounded-full p-2 ${
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
