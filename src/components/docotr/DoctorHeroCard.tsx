import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

async function DoctorHeroCard() {
  const session = await getServerSession(authOptions);
  return (
    <div className="rounded-3xl my-4 flex flex-row justify-between bg-sky-400 w-4/6 h-[35vh] min-h-fit">
      <div className="flex justify-end items-end p-12">
        <p className="text-4xl font-bold">
          Hello, Dr. {session?.user.name?.split(" ")[0]}
        </p>
      </div>
      <Image
        src={"/doctor.svg"}
        alt="Image of doctor"
        width={400}
        height={400}
        className="mt-9"
      />
    </div>
  );
}

export default DoctorHeroCard;
