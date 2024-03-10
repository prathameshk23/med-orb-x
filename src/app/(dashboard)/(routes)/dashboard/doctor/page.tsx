import DoctorHeroCard from "@/components/docotr/DoctorHeroCard";
import DoctorProfileCard from "@/components/docotr/DoctorProfileCard";
import DoctorStats from "@/components/doctor-stats";
import { authOptions } from "@/lib/auth";
import { Bot, MessageSquare } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
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
      <div className="flex flex-col lg:ml-[120px] gap-[8rem]">
        <div className="flex flex-row">
          <DoctorHeroCard />
          <DoctorProfileCard />
        </div>
        <div className="flex flex-row justify-center items-center gap-[8rem]">
          <DoctorStats />
          <div>
            <div className="gap-4 flex flex-col justify-center items-center size-[20rem] bg-indigo-400 rounded-3xl text-black">
              <div>
                <Link href={"doctor/chat"}>
                  <MessageSquare className="size-[4rem]" />
                </Link>
              </div>
              <div className="text-2xl font-bold text-center">
                Chat with you patients
              </div>
            </div>
          </div>
          <div>
            <div className="gap-4 flex flex-col justify-center items-center size-[20rem] bg-yellow-200 rounded-3xl text-black">
              <div>
                <Link href={"doctor/ai"}>
                  <Bot size={100} />
                </Link>
              </div>
              <div className="text-2xl font-bold text-center">
                Take help from AI
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
