"use client";
import { columns } from "@/app/(dashboard)/(routes)/dashboard/patient/records/columns";
import { DataTable } from "@/components/data-table";
import { useContractContext } from "@/context/contractContext";
import { useContractRead } from "@thirdweb-dev/react";

function PatientTableRenderer({ patientAddress }: { patientAddress: string }) {
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

  const { contract } = useContractContext();
  const patientrecords = useContractRead(contract, "getPatientRecords", [
    patientAddress,
  ]);
  const data = patientrecords.data;
  const mappedData = data?.map((record: any) => ({
    uploader: record.uploader,
    name: record.name,
    timestamp: formatDate(record.timestamp),
    content: record.content,
  }));
  return (
    <div>
      {patientrecords.isLoading ? (
        <div>Loading...</div>
      ) : (
        <DataTable columns={columns} data={mappedData} />
      )}
    </div>
  );
}

export default PatientTableRenderer;
