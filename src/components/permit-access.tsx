"use client";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useContractContext } from "@/context/contractContext";
import toast from "react-hot-toast";

export default function GrantAccess({
  doctorAddr,
}: {
  doctorAddr: string | undefined;
}) {
  const address = useAddress();
  const { contract, doctorWithAccess } = useContractContext();
  const data = doctorWithAccess.data;
  const permitAccess = useContractWrite(contract, "permitAccess");
  const revokeAccess = useContractWrite(contract, "revokeAccess");

  const handleGrant = async () => {
    try {
      await permitAccess.mutateAsync({ args: [doctorAddr] });
      toast.success("Access granted");
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const handleReovke = async () => {
    toast.success("started...");
    try {
      await revokeAccess.mutateAsync({ args: [doctorAddr] });
      toast.success("Access revoked");
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  return (
    <main>
      {data?.includes(doctorAddr) ? (
        <Button
          onClick={handleReovke}
          disabled={!address || revokeAccess.isLoading}
          className={cn(
            buttonVariants({ variant: "default" }),
            ` ${
              permitAccess.isLoading
                ? "bg-gray-600 cursor-default hover:bg-gray-600"
                : "bg-gradient-to-r from-violet-500 to-fuchsia-500 cursor-pointer hover:from-violet-600 hover:to-fuchsia-600"
            }`,
          )}
        >
          Revoke Access
        </Button>
      ) : (
        <Button
          onClick={handleGrant}
          disabled={!address || permitAccess.isLoading}
          className={cn(
            buttonVariants({ variant: "default" }),
            ` ${
              permitAccess.isLoading
                ? "bg-gray-600 cursor-default hover:bg-gray-600"
                : "bg-gradient-to-r from-violet-500 to-fuchsia-500 cursor-pointer hover:from-violet-600 hover:to-fuchsia-600"
            }`,
          )}
        >
          {permitAccess.isLoading ? "Granting..." : "Grant Access"}
        </Button>
      )}
    </main>
  );
}
