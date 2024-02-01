"use client";
import React from "react";
import { ContractContext } from "./contractContext";
import {
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "@/lib/address";
import toast from "react-hot-toast";
import { ContractContextType, UserProps } from "@/types/medorbx";
import { signOut } from "next-auth/react";

function ContractContextProvider({ children }: { children: React.ReactNode }) {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { mutateAsync: addAgent } = useContractWrite(contract, "addAgent");
  const patientList = useContractRead(contract, "getPatientList");
  const doctorList = useContractRead(contract, "getDoctorList");
  const patientrecords = useContractRead(
    contract,
    "getPatientRecords",
    //@ts-ignore
    ["0xE324f03292a7Aa11EFc3C70F56d780CDf36D6807"],
  );

  const SigningOut = async () => {
    try {
      await signOut({
        callbackUrl: "/",
      });
    } catch (error) {
      toast.error("There was an error out with Google");
    } finally {
    }
  };

  const addUser = async ({
    username,
    designation,
    recordName,
    recordContent,
  }: UserProps) => {
    try {
      const data = await addAgent({
        args: [username, designation, recordName, recordContent],
      });
    } catch (error: any) {
      const err: Error = {
        name: error.name,
        message: error.message.match(/Reason: (.+?)\n/)?.[1] as string,
      };
      toast.error(err.message);
      return;
    }
    toast.success("Agent Added");
  };

  const contextValue: ContractContextType = {
    contract,
    addUser,
    SigningOut,
    patientList,
    doctorList,
    patientrecords,
  };

  return (
    <div>
      <ContractContext.Provider value={contextValue}>
        {children}
      </ContractContext.Provider>
    </div>
  );
}

export default ContractContextProvider;
