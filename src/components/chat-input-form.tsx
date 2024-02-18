"use client";
import { useRef } from "react";
import { addMessage } from "@/lib/action";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function ChatWithDoctorForm({ receiverId }: { receiverId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <form
      action={async (formData: FormData) => {
        addMessage(formData);
        formRef.current?.reset();
      }}
      method="post"
      ref={formRef}
    >
      <div className="flex flex-row justify-between gap-4 items-center">
        <input type="hidden" name="receiverId" value={receiverId} />
        <Input
          type="text"
          className="bg-gray-300 h-24 rounded-lg text-black"
          placeholder="Type your message here"
          name="message"
          id="message"
        />
        <Button className="rounded-full" type="submit">
          Send
        </Button>
      </div>
    </form>
  );
}

export default ChatWithDoctorForm;
