"use client";

import { useToast } from "@/hooks/use-toast";
import { CONTRACT_ADDRESS } from "@/lib/address";
import { Web3Button } from "@thirdweb-dev/react";
import { redirect } from "next/navigation";

function SubmitButton() {
  const { toast } = useToast();
  return (
    <div>
      <div>
        <Web3Button
          type="submit"
          contractAddress={CONTRACT_ADDRESS}
          action={(contract) =>
            contract.call("addAgent", ["prathamz", 1, "undefined", "null"])
          }
          onSuccess={() => {
            toast({
              title: "Agent Added",
              description: "Agent Added Successfully",
            });
            redirect("/dashboard/patieent");
          }}
          onError={(error) => {
            toast({
              title: "Agent Not Added",
              description: error.message,
            });
            console.log("the errror is " + error.cause);
          }}
        >
          Add Agent
        </Web3Button>
      </div>
    </div>
  );
}

export default SubmitButton;
