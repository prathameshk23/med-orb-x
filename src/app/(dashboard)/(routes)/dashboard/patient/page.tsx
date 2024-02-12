import PatientHeroCard from "@/components/paitent/PatientHeroCard";
import PatientProfileCard from "@/components/paitent/PatientProfileCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);

  if (!session?.user.username) {
    redirect("/first-login");
  } else {
    if (session?.user.role === "doctor") {
      return <div>only for patient</div>;
    } else {
      return (
        <div className="flex flex-col lg:flex-row justify-between items-center lg:ml-[120px]">
          <PatientHeroCard />
          <PatientProfileCard />
        </div>
      );
    }
  }
}

export default page;
