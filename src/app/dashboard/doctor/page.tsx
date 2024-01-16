import SignOut from "@/components/SignOut";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);

  if (session?.user.role === "patient") {
    return <div>only for doctors</div>;
  } else {
    return (
      <div>
        <div>{session?.user.name}</div>
        <div>This is doctor page</div>
        <SignOut />
      </div>
    );
  }
}

export default page;
