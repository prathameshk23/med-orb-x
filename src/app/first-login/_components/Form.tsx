"use client";
import { Button } from "@/components/ui/Button";
import { addUsername } from "@/lib/action";
import { useAddress } from "@thirdweb-dev/react";
import React from "react";

function Form() {
  const address = useAddress();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form action={addUsername} method="post">
        <div className="flex flex-col gap-4 justify-center items-center rounded-xl p-24 bg-red-400">
          <input type="text" name="username" id="username" />
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            className="hidden"
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
