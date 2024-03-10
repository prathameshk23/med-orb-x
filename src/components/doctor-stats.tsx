"use client";
import { useContractContext } from "@/context/contractContext";
import { useContractRead } from "@thirdweb-dev/react";
import React from "react";

function DoctorStats() {
  const { paitentWithAccess, contract } = useContractContext();
  const patientList = paitentWithAccess.data;
  let totalRecords = 0;
  for (let i = 0; i < patientList?.length; i++) {
    const patientrecords = useContractRead(contract, "getPatientRecords", [
      patientList?.[i],
    ]);
    totalRecords += patientrecords?.data?.length;
  }
  const numberOfPatients = patientList?.length;
  return (
    <div className="flex gap-4">
      <div className="flex flex-col justify-center items-center size-[20rem] bg-red-400 rounded-3xl text-black">
        <div className="flex flex-col justify-center items-center border-pink-100 border-8 p-16 rounded-full ">
          <div className="text-5xl font-bold">{numberOfPatients}</div>
          <div className="text-2xl font-bold">Total</div>
          <div className="text-2xl font-bold">Patients</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center size-[20rem] bg-sky-400 rounded-3xl text-black">
        <div className="flex flex-col justify-center items-center border-pink-100 border-8 p-16 rounded-full ">
          <div className="text-5xl font-bold">{totalRecords}</div>
          <div className="text-2xl font-bold">Records</div>
          <div className="text-2xl font-bold">Uploaded</div>
        </div>
      </div>
    </div>
  );
}

export default DoctorStats;
