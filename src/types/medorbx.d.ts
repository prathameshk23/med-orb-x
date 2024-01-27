import { SmartContract } from "@thirdweb-dev/sdk";
import { BaseContract } from "ethers";

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
}
