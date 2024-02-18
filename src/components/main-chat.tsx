import { db } from "@/lib/db";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import Chat from "./Chat";
import ChatInputForm from "./chat-input-form";

export const dynamic = "force-dynamic";
async function MainChat({
  senderId,
  receiverId,
}: {
  senderId: string;
  receiverId: string;
}) {
  const user = await db.user.findUnique({
    where: {
      id: receiverId,
    },
  });

  const messages = await db.message.findMany({
    where: {
      OR: [
        { AND: [{ userId: senderId }, { receiverId: receiverId }] },
        { AND: [{ userId: receiverId }, { receiverId: senderId }] },
      ],
    },
    select: {
      id: true,
      message: true,
      createdAt: true,
      userId: true,
      receiverId: true,
      sender: {
        select: {
          name: true,
          image: true,
        },
      },
      receiver: {
        select: {
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 50,
  });

  // Find the intersection of senderMessages and receiverMessages based on messageId or other unique identifier

  return (
    <section className="2xl:ml-[9rem] 2xl:pt-[5.55rem] lg:ml-[7rem] lg:pt-[5rem]">
      <div className="bg-purple-500/30 backdrop-blur-lg w-[65vw] min-h-[85vh] rounded-lg">
        <div className="p-4 flex flex-col justify-between h-[85vh] gap-4">
          <div>
            <div className="flex flex-row justify-start items-center gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.image as string} />
              </Avatar>
              <div className="text-2xl">{user?.name}</div>
            </div>
            <Separator className="bg-pink-300 mt-4" />
          </div>
          <Chat senderId={senderId} receiverId={receiverId} data={messages} />
          <ChatInputForm receiverId={receiverId} />
        </div>
      </div>
    </section>
  );
}

export default MainChat;
