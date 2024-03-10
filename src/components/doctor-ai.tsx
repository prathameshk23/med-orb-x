"use client";

import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useRef } from "react";
import { SendHorizontalIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export default function AiChatDoctor() {
  const session = useSession();
  const userImg = session.data?.user.image;
  const ref = useRef<HTMLDivElement>(null);
  const { isLoading, messages, input, handleInputChange, handleSubmit, error } =
    useChat({
      initialMessages: [
        {
          id: Date.now().toString(),
          role: "system",
          content:
            "You are an assistant that gives long answers. Act like a assistant to the doctor and respond to health relaterd questions only. Your name is MedOrbXAI. Do not answer to any question that is not helth related. Help the doctor with any queries he has.",
        },
      ],
    });

  useEffect(() => {
    if (ref.current === null) return;
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [messages]);
  return (
    <div className="flex flex-col justify-between mt-3 w-[50vw] h-[80vh] bg-purple-900 p-4 rounded-md">
      {error && <div className="text-red-500">{error.message}</div>}
      <ScrollArea className="mb-2 rounded-md p-4" ref={ref}>
        {messages.map((m) => (
          <div key={m.id} className="mr-6 whitespace-pre-wrap md:mr-12">
            {m.role === "user" && (
              <div className="mb-6 flex gap-3">
                <Avatar>
                  <AvatarImage src={userImg as string} />
                  <AvatarFallback className="text-sm">U</AvatarFallback>
                </Avatar>
                <div className="mt-1.5">
                  <p className="font-semibold">You</p>
                  <div className="mt-1.5 text-sm text-white">{m.content}</div>
                </div>
              </div>
            )}

            {m.role === "assistant" && (
              <div className="mb-6 flex gap-3">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-emerald-500 text-white">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="mt-1.5 w-full">
                  <div className="flex justify-between">
                    <p className="font-semibold">Bot</p>
                  </div>
                  <div className="mt-2 text-sm text-white">{m.content}</div>
                </div>
              </div>
            )}
          </div>
        ))}
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-center justify-center gap-4"
      >
        <Input
          name="message"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a Question..."
          className="pr-12 placeholder:italic placeholder:text-white border-none outline-none bg-purple-800 text-white w-full rounded-md p-2"
        />
        <Button
          size="icon"
          type="submit"
          variant="secondary"
          disabled={isLoading}
          className="w-fit p-2 bg-purple-800"
        >
          <SendHorizontalIcon className="h-5 w-5 text-indigo-300" />
        </Button>
      </form>
    </div>
  );
}
