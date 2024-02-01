import { SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract } from "ethers";
import { $Enums } from "@prisma/client";

export type UserProps = {
  username: string;
  designation: number;
  recordName: string[];
  recordContent: string[];
};

// Define the context interface
export interface ContractContextType {
  contract: SmartContract<BaseContract> | undefined;
  addUser: (userProps: UserProps) => Promise<void>;
  SigningOut: () => Promise<void>;
  patientList: any;
  doctorList: any;
  patientrecords: any;
}

export type User = {
  id: string;
  name: string | null;
  username: string | null;
  address: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: $Enums.UserRole | null;
}[];
