import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

async function DoctorProfileCard() {
  const session = await getServerSession(authOptions);
  return (
    <div className="min-h-[200px] w-4/12 bg-indigo-800 mx-4 my-4 h-[35vh] rounded-3xl p-10 flex flex-row justify-start items-center gap-2">
      <div className="rounded-full">
        <Image
          src={session?.user.image as string}
          alt="Profile picture of doctor"
          height={150}
          width={150}
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col justify-center items-start gap-1">
        <p className="text-2xl font-bold text-white">
          Dr. {session?.user.name?.split(" ")[0]}
        </p>
        <p className="text-lg text-white">@{session?.user.username}</p>
        <p className="text-lg text-white">{session?.user.email}</p>
        <p className="text-lg text-white">{session?.user.address}</p>
      </div>
    </div>
  );
}

export default DoctorProfileCard;
