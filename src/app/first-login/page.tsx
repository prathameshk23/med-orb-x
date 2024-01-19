import SubmitButton from "@/components/SubmitButton";
import WalletConnectButton from "@/components/WalletConnectButton";
import { addUsername } from "@/lib/action";
import React from "react";

async function Page() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <form action={addUsername} method="post">
          <input type="text" name="username" id="username" />
          <SubmitButton />
        </form>
      </div>
      <WalletConnectButton />
    </div>
  );
}

export default Page;
