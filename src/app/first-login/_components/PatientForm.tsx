"use client";
import WalletConnectButton from "@/components/WalletConnectButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContractContext } from "@/context/contractContext";
import { addUsername } from "@/lib/action";
import { cn } from "@/lib/utils";
import { useAddress, useStorageUpload } from "@thirdweb-dev/react";
import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

function PatientForm() {
  const [isfiles, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutateAsync: upload } = useStorageUpload();
  const [isUsername, setIsUsername] = useState("");
  const address = useAddress();
  const { addUser } = useContractContext();
  const router = useRouter();

  const retriveFile = (e: ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files;
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const file = data[i];
        setFiles((prev) => [...prev, file]);
        setFileNames((prev) => [...prev, file.name]);
      }
    }
    e.preventDefault();
  };

  const uploadFile = async () => {
    const Url = await upload({
      data: isfiles,
      options: {
        uploadWithGatewayUrl: true,
      },
    });
    return Url;
  };

  const handleAddAgent = async () => {
    setIsLoading(true);
    const uri = await uploadFile();
    await addUser({
      username: isUsername,
      designation: 0,
      recordName: fileNames,
      recordContent: uri,
    });
    setIsLoading(false);
    router.refresh();
  };

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

          <Label
            htmlFor="fileUpload"
            className="bg-transparent text-white text-base rounded w-72 h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-purple-500 border-dashed mx-auto font-[sans-serif] hover:border-solid"
          >
            <Upload size={48} className="text-white mb-1" />
            Upload file
            <Input
              required
              multiple
              type="file"
              id="fileUpload"
              className="hidden"
              disabled={!address}
              onChange={retriveFile}
              accept=".pdf"
            />
            <p className="text-md text-gray-400 mt-2">Only PDFs are allowed</p>
          </Label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            className="hidden"
          />
          <div className="flex justify-center items-center flex-col gap-4">
            <div className="bg-purple-300 p-4 rounded-full text-black">
              {fileNames.length > 0 ? (
                <p>{fileNames.length} files selected</p>
              ) : (
                <p>No files selected</p>
              )}
            </div>
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
              onClick={handleAddAgent}
            >
              {isLoading ? (
                <Loader2 className="w-10 h-10 text-black animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
          <div className="flex justify-center items-center">
            <WalletConnectButton />
          </div>
        </div>
      </form>
    </div>
  );
}

export default PatientForm;
