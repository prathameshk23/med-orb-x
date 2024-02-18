"use client";
import React from "react";
import { Separator } from "../ui/separator";
import { useContractContext } from "@/context/contractContext";
import { getUser } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/medorbx";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "../ui/avatar";
import clsx from "clsx";
import { usePathname } from "next/navigation";

function ChatSideBar() {
  const { paitentWithAccess } = useContractContext();
  const session = useSession();
  const userId = session.data?.user.id;
  const patientList = paitentWithAccess.data;
  const data = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await getUser(patientList);
    },
    enabled: !!patientList,
  });
  const patients: User = data.data as User;
  const pathname = usePathname();

  return (
    <aside className="min-h-[85vh] backdrop-blur-lg bg-transparent/30 rounded-lg flex flex-col p-8 w-[25vw] mt-8">
      <div className="flex justify-start items-start flex-col mb-4">
        <h1 className="text-4xl">Patients</h1>
        <Separator className="bg-purple-300" />
      </div>
      <div className="flex flex-col gap-8 text-lg mt-8">
        {data.isLoading ? (
          <p>Loading...</p>
        ) : (
          patients?.map((patient) => (
            <div
              key={patient.id}
              className={clsx(
                "hover:bg-sky-100 hover:text-blue-600 rounded-lg",
                {
                  "bg-purple-400 text-sky-100":
                    pathname ===
                    `/dashboard/doctor/chat/${userId}--${patient.id}`,
                },
              )}
            >
              <Link href={`/dashboard/doctor/chat/${userId}--${patient.id}`}>
                <div className="flex flex-row gap-2 items-center p-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={patient.image as string} />
                  </Avatar>
                  <div>{patient.name}</div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

export default ChatSideBar;
