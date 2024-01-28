import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

async function DoctorHeroCard() {
  const session = await getServerSession(authOptions);
  return (
    <div className="rounded-3xl lg:my-4 mt-36 flex lg:flex-row flex-col justify-between items-center bg-sky-400 lg:w-4/6 w-fit h-[35vh] min-h-fit">
      <div className="flex justify-end items-end p-12">
        <p className="text-xl xl:text-2xl 2xl:text-4xl font-bold break-all">
          Hello, Dr. {session?.user.name?.split(" ")[0]}
        </p>
      </div>
      <Image
        src={"/doctor.svg"}
        alt="Image of doctor"
        width={400}
        height={400}
        className="lg:mt-9 size-[12rem] 2xl:size-[25rem] xl:size-[14rem]"
      />
    </div>
  );
}

export default DoctorHeroCard;
