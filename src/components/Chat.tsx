"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { Avatar, AvatarImage } from "./ui/avatar";

type Message = {
  id: string;
  message: string;
  userId: string | null;
  receiverId: string | null;
  createdAt: Date;
  sender: {
    name: string | null;
    image: string | null;
  } | null;
  receiver: {
    name: string | null;
    image: string | null;
  } | null;
}[];

function Chat({
  senderId,
  receiverId,
  data,
}: {
  senderId: string;
  receiverId: string;
  data: Message;
}) {
  const [messages, setMessages] = useState(data);
  const messageEndRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    pusherClient.subscribe("chat");
    pusherClient.bind("message", function (data: any) {
      const parsedData = JSON.parse(data.message);
      if (
        (parsedData.userId === senderId &&
          parsedData.receiverId === receiverId) ||
        (parsedData.userId === receiverId && parsedData.receiverId === senderId)
      ) {
        setMessages((prev) => [parsedData, ...prev]);
      }
    });
    return () => {
      pusherClient.unsubscribe("chat");
    };
  }, []);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full flex m-2 flex-col-reverse gap-2 overflow-y-auto chat-hidden-scrollbar">
      {messages?.map((message) => (
        <div
          className={clsx("flex gap-2", {
            "justify-end items-center flex-row gap-2":
              message.userId === senderId,
            "justify-end items-center flex-row-reverse gap-2":
              message.userId === receiverId,
          })}
          key={message.id}
        >
          <div
            className={clsx("flex flex-row gap-2", {
              "justify-end items-center bg-violet-400 p-2 rounded-lg":
                message.userId === senderId,
              "justify-start items-center bg-purple-600 p-2 rounded-lg":
                message.userId === receiverId,
            })}
          >
            {atob(message.message)}
          </div>
          <div ref={messageEndRef}></div>
        </div>
      ))}
    </div>
  );
}

export default Chat;
