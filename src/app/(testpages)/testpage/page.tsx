"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/medorbx";
import { useContractContext } from "@/context/contractContext";
import Link from "next/link";
import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";
import { Button } from "@/components/ui/button";
import WalletConnectButton from "@/components/WalletConnectButton";
import { getUser } from "@/lib/action";

type records = {
  addr: string;
  content: string;
  name: string;
  timestamp: number;
  uploader: string;
}[];

function Page() {
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
  const address = useAddress();
  // const userId = [
  //   "clrx5zec100098elsr9dkk30h",
  //   "clrxga92q000010hlb8tcej39",
  //   "clrx5zec100098elsr9dkk30h",
  //   "clrxga92q000010hlb8tcej39",
  // ];
  const {
    patientList,
    doctorList,
    patientrecords,
    doctorWithAccess,
    paitentWithAccess,
  } = useContractContext();
  const addr = doctorWithAccess.data;

  const data = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await getUser(addr);
    },
  });
  const users: User = data.data as User;
  const patients = patientList.data;
  const doctors = doctorList.data;
  const patientRecords: records = patientrecords.data;
  const { contract } = useContract(
    "0x9f9D4e5Fdd1E645711257c8D5241a86Fa517a08d",
  );
  const { mutateAsync: uploadRecord, isLoading } = useContractWrite(
    contract,
    "uploadRecord",
  );
  const doctorAddr = "0xE324f03292a7Aa11EFc3C70F56d780CDf36D6807";
  const recordName = "record1";
  const _record = "record1";
  const patientAddr = "0xAcec262a25d2FeE7b08a906153B3A5a90468E7Dc";

  const call = async () => {
    try {
      const data = await uploadRecord({
        args: [patientAddr, recordName, _record],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };
  const { mutateAsync: revokeAccess } = useContractWrite(
    contract,
    "revokeAccess",
  );

  const getName = async (addr: string) => {
    return data;
  };

  const dcall = async () => {
    try {
      const data = await revokeAccess({ args: [doctorAddr] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <WalletConnectButton />
      <Button onClick={call} disabled={!address}>
        Add Record
      </Button>
      <Button onClick={dcall} disabled={!address}>
        reovke Record
      </Button>
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
            patientRecords?.map((record) => (
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
                <p>Uploader: {record.uploader}</p>
                <p>Time: {formatDate(record.timestamp)}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
