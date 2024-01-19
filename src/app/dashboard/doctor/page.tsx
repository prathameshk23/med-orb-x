import SignOut from "@/components/SignOut";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);

  if (!session?.user.username) {
    redirect("/first-login");
  }

  if (session?.user.role === "patient") {
    return <div>only for doctors</div>;
  } else {
    return (
      <div className="flex flex-col justify-center lg:px-36 items-center min-h-screen">
        <div>{session?.user.name}</div>
        <div>This is doctor page</div>
        <SignOut />
      </div>
    );
  }
}

export default page;
