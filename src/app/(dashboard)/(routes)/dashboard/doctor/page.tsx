import DoctorHeroCard from "@/components/docotr/DoctorHeroCard";
import DoctorProfileCard from "@/components/docotr/DoctorProfileCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user.username) {
    redirect("/first-login");
  }

  if (session?.user.role === "patient") {
    return <div>only for doctors</div>;
  } else {
    return (
      <div className="flex flex-col lg:flex-row justify-between items-center lg:ml-[120px]">
        <DoctorHeroCard />
        <DoctorProfileCard />
      </div>
    );
  }
}

export default Page;
