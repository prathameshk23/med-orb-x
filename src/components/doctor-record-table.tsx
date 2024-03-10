"use client";
import { columns } from "@/app/(dashboard)/(routes)/dashboard/patient/records/columns";
import { DataTable } from "@/components/data-table";
import { useContractContext } from "@/context/contractContext";
import { Skeleton } from "./ui/skeleton";

function DoctorTableRenderer({ docterAddress }: { docterAddress: string }) {
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

  const { patientrecords } = useContractContext();
  const data = patientrecords.data;
  const mappedData = data
    ?.filter((record: any) => record.uploader === docterAddress)
    .map((record: any) => ({
      uploader: record.uploader,
      name: record.name,
      timestamp: formatDate(record.timestamp),
      content: record.content,
    }));
  return (
    <div>
      {patientrecords.isLoading ? (
        <Skeleton className="gap-8 flex flex-col justify-center items-center h-[20rem] w-[80rem]">
          <Skeleton className="h-4 w-[75rem]" />
          <Skeleton className="h-4 w-[75rem]" />
          <Skeleton className="h-4 w-[75rem]" />
          <Skeleton className="h-4 w-[75rem]" />
          <Skeleton className="h-4 w-[75rem]" />
          <Skeleton className="h-4 w-[75rem]" />
        </Skeleton>
      ) : (
        <DataTable columns={columns} data={mappedData} />
      )}
    </div>
  );
}

export default DoctorTableRenderer;
