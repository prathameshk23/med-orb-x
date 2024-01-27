"use client";
import { ContractContextType } from "@/types/medorbx";
import { createContext, useContext } from "react";

export const ContractContext = createContext<ContractContextType | undefined>(
  undefined,
);

export const useContractContext = (): ContractContextType => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error(
      "useContractContext must be used within a ContractContextProvider",
    );
  }
  return context;
};
