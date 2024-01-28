import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function DoctorProfileCard() {
  const session = await getServerSession(authOptions);
  return (
    <div className="hidden min-h-[200px] xl:w-4/12 w-full bg-indigo-800 mx-4 flex-wrap my-4 h-[35vh] rounded-3xl p-4 lg:flex flex-row justify-start items-center gap-2">
      <Avatar className="2xl:h-24 2xl:w-24 w-16 h-16">
        <AvatarImage
          src={session?.user.image as string}
          alt="Profile picture of doctor"
        />
        <AvatarFallback>Profice picture</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center items-start gap-1 break-all">
        <p className="text-lg 2xl:text-2xl font-bold text-white">
          Dr. {session?.user.name?.split(" ")[0]}
        </p>
        <div className="text-xs 2xl:text-lg">
          <p>@{session?.user.username}</p>
          <p>{session?.user.email}</p>
          <p>{session?.user.address}</p>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfileCard;
