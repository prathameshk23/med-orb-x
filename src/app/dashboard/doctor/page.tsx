import SignOut from "@/components/SignOut";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <div>{session?.user.name}</div>
      <SignOut />
    </div>
  );
}

export default page;
