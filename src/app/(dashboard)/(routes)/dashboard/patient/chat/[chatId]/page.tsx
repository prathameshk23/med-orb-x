import MainChat from "@/components/main-chat";
import React from "react";

function Page({ params }: { params: { chatId: string } }) {
  const chatId = params.chatId;
  const senderId = chatId.split("--")[0];
  const receiverId = chatId.split("--")[1];
  return (
    <div>
      <MainChat senderId={senderId} receiverId={receiverId} />
    </div>
  );
}

export default Page;
