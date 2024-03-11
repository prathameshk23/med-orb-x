"use client";
import { useContractContext } from "@/context/contractContext";
import React from "react";

function Stats() {
  const { doctorWithAccess, patientrecords } = useContractContext();
  const doctorlist = doctorWithAccess.data;
  const data = patientrecords.data;

  const numberOfDoctors = doctorlist?.length;
  const numberOfRecords = data?.length;
  return (
    <div className="flex gap-4">
      <div className="flex flex-col justify-center items-center size-[20rem] bg-indigo-400 rounded-3xl text-black">
        <div className="flex flex-col justify-center items-center border-pink-100 border-8 p-16 rounded-full ">
          <div className="text-5xl font-bold">{numberOfDoctors}</div>
          <div className="text-2xl font-bold">Total</div>
          <div className="text-2xl font-bold">Doctors</div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center size-[20rem] bg-indigo-200 rounded-3xl text-black">
        <div className="flex flex-col justify-center items-center border-pink-100 border-8 p-16 rounded-full ">
          <div className="text-5xl font-bold">{numberOfRecords}</div>
          <div className="text-2xl font-bold">Total</div>
          <div className="text-2xl font-bold">Records</div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
