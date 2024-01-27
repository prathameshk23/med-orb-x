"use client";
import React from "react";
import { ContractContext } from "./contractContext";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "@/lib/address";
import toast from "react-hot-toast";
import { ContractContextType, UserProps } from "@/types/medorbx";
import { signOut } from "next-auth/react";

function ContractContextProvider({ children }: { children: React.ReactNode }) {
  const { contract } = useContract(CONTRACT_ADDRESS);
  const { mutateAsync: addAgent } = useContractWrite(contract, "addAgent");

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
