"use client";
import { useContractContext } from "@/context/contractContext";
import { getUser } from "@/lib/action";
import { User } from "@/types/medorbx";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

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
            <p>Loading...</p>
          ) : (
            doctors?.map((doctor) => (
              <div
                className="bg-white p-4 rounded-lg shadow-md text-black break-all"
                key={doctor.id}
              >
                <Link href={`/dashboard/patient/doctors/${doctor.address}`}>
                  <Avatar className="2xl:h-16 2xl:w-16 w-16 h-16">
                    <AvatarImage
                      src={doctor.image as string}
                      alt="Profile picture of patient"
                    />
                    <AvatarFallback>Profice picture</AvatarFallback>
                  </Avatar>
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
