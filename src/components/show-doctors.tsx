"use client";
import { useContractContext } from "@/context/contractContext";
import { getUser } from "@/lib/action";
import { User } from "@/types/medorbx";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

function ShowDoctors() {
  const { doctorWithAccess } = useContractContext();
  const doctorlist = doctorWithAccess.data;
  const data = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await getUser(doctorlist);
    },
    enabled: !!doctorlist,
  });

  const doctors: User = data.data as User;
  return (
    <div>
      <div className="container">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          id="userContainer"
        >
          {data.isLoading ? (
            <div className="flex flex-row gap-4">
              <Skeleton className="flex flex-row items-center space-x-4 p-4 w-[25rem] h-[10rem]">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </Skeleton>
              <Skeleton className="flex flex-row items-center space-x-4 p-4 w-[25rem] h-[10rem]">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </Skeleton>
              <Skeleton className="flex flex-row items-center space-x-4 p-4 w-[25rem] h-[10rem]">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </Skeleton>
            </div>
          ) : (
            doctors?.map((doctor) => (
              <div
                className="bg-white p-4 rounded-lg shadow-md text-black break-all"
                key={doctor.id}
              >
                <Link href={`/dashboard/patient/doctors/${doctor.address}`}>
                  <Image
                    src={doctor.image as string}
                    alt="Profile picture of patient"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <p className="text-lg font-bold">{doctor.name}</p>
                  <p>@{doctor.username}</p>
                  <p>Email: {doctor.email}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowDoctors;
