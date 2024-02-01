"use client";
import { getUser } from "@/lib/action";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/medorbx";
import { useContractContext } from "@/context/contractContext";
import Link from "next/link";

function Page() {
  const { patientList, doctorList, patientrecords } = useContractContext();
  const data = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await getUser();
    },
  });
  const users: User = data.data as User;
  const patients = patientList.data;
  const doctors = doctorList.data;
  const patientRecords = patientrecords.data;
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">User List</h1>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          id="userContainer"
        >
          {data.isLoading ? (
            <p>Loading...</p>
          ) : (
            users?.map((user: any) => (
              <div
                className="bg-white p-4 rounded-lg shadow-md text-black"
                key={user.id}
              >
                <p className="text-lg font-bold">User ID: {user.id}</p>
                <p>Email: {user.email}</p>
                <p>Name: {user.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Doctor List</h1>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          id="userContainer"
        >
          {doctorList.isLoading ? (
            <p>Loading...</p>
          ) : (
            doctors?.map((doctor: any) => (
              <div
                className="bg-white p-4 rounded-lg shadow-md text-black break-all"
                key={doctor.addr}
              >
                <p className="text-lg font-bold">User ID: {doctor.addr}</p>
                <p>Name: {doctor.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Patient List</h1>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          id="userContainer"
        >
          {patientList.isLoading ? (
            <p>Loading...</p>
          ) : (
            patients?.map((patient: any) => (
              <div
                className="bg-white p-4 rounded-lg shadow-md text-black break-all"
                key={patient.addr}
              >
                <p className="text-lg font-bold">User ID: {patient.addr}</p>
                <p>Name: {patient.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Patient Record</h1>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          id="userContainer"
        >
          {patientrecords.isLoading ? (
            <p>Loading...</p>
          ) : (
            patientRecords?.map((record: any) => (
              <div
                className="bg-white p-4 rounded-lg shadow-md text-black break-all"
                key={record.content}
              >
                <Link
                  className="text-lg font-bold"
                  href={record.content}
                  target="_blank"
                >
                  <p>Name: {record.name}</p>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
