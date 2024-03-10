"use client";
import { useContractContext } from "@/context/contractContext";
import { useAddress, useContractRead } from "@thirdweb-dev/react";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";

function ShowPrescription({ doctorAddr }: { doctorAddr: string }) {
  function formatDate(timestamp: number) {
    const utcDate = new Date(timestamp * 1000);

    const timezone = "Asia/Kolkata";
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(utcDate);
    return formattedDate;
  }

  const patientAddr = useAddress();
  const { contract } = useContractContext();
  const { data, isLoading } = useContractRead(contract, "getPrescriptions", [
    patientAddr,
    doctorAddr,
  ]);
  console.log(data);

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <ScrollArea className="h-[50vh] w-full p-10">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ) : (
            <div>
              {data?.map((prescription: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 items-center justify-center"
                >
                  <div>
                    <div className="text-lg">
                      Time: {formatDate(prescription.timestamp)}
                    </div>
                    <div className="mb-2">
                      <div>Medicine: {prescription.medicine}</div>
                      <div>
                        Dosage: {parseInt(prescription.dosage, 16)} times a day
                      </div>
                      <div>Instructions: {prescription.instructions}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}

export default ShowPrescription;
