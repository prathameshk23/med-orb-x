"use client";
import WalletConnectButton from "@/components/WalletConnectButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContractContext } from "@/context/contractContext";
import { addUsername } from "@/lib/action";
import { cn } from "@/lib/utils";
import { useAddress } from "@thirdweb-dev/react";
import React from "react";

function DoctorForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isUsername, setIsUsername] = React.useState("");
  const address = useAddress();
  const { addUser } = useContractContext();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="relative w-full max-w-lg">
        <div className="absolute top-10 -left-4 w-72 h-72 bg-[#0d233a] purple-300 rounded-full filter blur-2xl animate-blob opacity-70"></div>
        <div className="absolute top-10 -right-4 w-72 h-72 bg-[#452041] yellow-300 rounded-full filter blur-2xl animate-blob animation-delay-2000 opacity-70"></div>
        <div className="absolute -bottom-8 top-52 left-20 w-72 h-72 bg-purple-900 rounded-full filter blur-2xl animate-blob animation-delay-4000 opacity-70"></div>
      </div>
      <form action={addUsername} method="post">
        <div className="backdrop-blur-xl flex flex-col gap-8 rounded-xl p-24 bg-[#212c40]/50 shadow-2xl shadow-purple-950 ">
          <div className="flex justify-start items-start flex-col gap-2 text-white">
            <Label htmlFor="username" className="text-md">
              Enter Username
            </Label>
            <Input
              required
              disabled={!address}
              type="text"
              name="username"
              id="username"
              placeholder={address ? "username" : "Connect Wallet"}
              className="outline-none border-2 border-purple-500"
              value={isUsername}
              onChange={(e) => setIsUsername(e.target.value)}
            />
          </div>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            className="hidden"
          />
          <div className="flex justify-center items-center ">
            <Button
              type="submit"
              disabled={!address}
              className={cn(
                buttonVariants({ variant: "default" }),
                `w-full rounded-full ${
                  isLoading
                    ? "bg-gray-600 cursor-default hover:bg-gray-600"
                    : "bg-gradient-to-r from-violet-500 to-fuchsia-500"
                }`,
              )}
              onClick={async () => {
                setIsLoading(true);
                await addUser({
                  username: isUsername,
                  designation: 1,
                  recordName: [],
                  recordContent: [],
                });
                setIsLoading(false);
              }}
            >
              Submit
            </Button>
          </div>
          <WalletConnectButton />
        </div>
      </form>
    </div>
  );
}

export default DoctorForm;
