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
  return (
    <div className="flex flex-col justify-center lg:px-36 items-center min-h-screen">
      This is patient page
      <SignOut />
    </div>
  );
}

export default page;
