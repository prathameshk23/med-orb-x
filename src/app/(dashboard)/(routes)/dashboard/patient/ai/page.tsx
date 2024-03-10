import AiChatDoctor from "@/components/doctor-ai";
import React from "react";

function Page() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div>
        <AiChatDoctor />
      </div>
    </div>
  );
}

export default Page;
