"use client";
import { useContractContext } from "@/context/contractContext";
import { getUser } from "@/lib/action";
import { User } from "@/types/medorbx";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";

function ShowPatients() {
  const { paitentWithAccess } = useContractContext();
  const patientList = paitentWithAccess.data;
  const data = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await getUser(patientList);
    },
    enabled: !!patientList,
  });

  const patients: User = data.data as User;
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
            patients?.map((patient) => (
              <div
                className="bg-white p-4 rounded-lg shadow-md text-black break-all"
                key={patient.id}
              >
                <Link href={`/dashboard/doctor/patients/${patient.address}`}>
                  <Avatar className="2xl:h-16 2xl:w-16 w-16 h-16">
                    <AvatarImage
                      src={patient.image as string}
                      alt="Profile picture of patient"
                    />
                    <AvatarFallback>Profice picture</AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-bold">{patient.name}</p>
                  <p>@{patient.username}</p>
                  <p>Email: {patient.email}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ShowPatients;
