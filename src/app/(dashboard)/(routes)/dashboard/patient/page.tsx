import PatientHeroCard from "@/components/paitent/PatientHeroCard";
import PatientProfileCard from "@/components/paitent/PatientProfileCard";
import Stats from "@/components/stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { BotIcon, Contact } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
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
        <div className="flex flex-col lg:ml-[120px] gap-[8rem]">
          <div className="flex flex-row">
            <PatientHeroCard />
            <PatientProfileCard />
          </div>
          <div className="flex flex-row justify-center items-center gap-[8rem]">
            <Stats />
            <div className="flex gap-4">
              <div>
                <div className="gap-4 flex flex-col justify-center items-center size-[20rem] bg-indigo-400 rounded-3xl text-black">
                  <div>
                    <Link href={"patient/search"}>
                      <Contact size={100} />
                    </Link>
                  </div>
                  <div className="text-2xl font-bold text-center">
                    Connect with your doctor
                  </div>
                </div>
              </div>
              <div>
                <div className="gap-4 flex flex-col justify-center items-center size-[20rem] bg-indigo-200 rounded-3xl text-black">
                  <div>
                    <Link href={"patient/ai"}>
                      <BotIcon size={100} />
                    </Link>
                  </div>
                  <div className="text-2xl font-bold text-center">
                    Chat with AI for health related queryes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default page;
