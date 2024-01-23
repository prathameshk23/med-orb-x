"use client";

import { CONTRACT_ADDRESS } from "@/lib/address";
import {
  useContract,
  useContractWrite,
  useStorageUpload,
} from "@thirdweb-dev/react";
import toast from "react-hot-toast";
import { ChangeEvent, useState } from "react";
import WalletConnectButton from "@/components/WalletConnectButton";

function Page() {
  const [isfiles, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const { mutateAsync: upload } = useStorageUpload();
  const { contract } = useContract(CONTRACT_ADDRESS);

  const {
    mutateAsync: addAgent,
    isLoading,
    isSuccess,
  } = useContractWrite(contract, "addAgent");

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
    const uri = await uploadFile();
    try {
      const data = await addAgent({
        args: ["kuku", 0, fileNames, uri],
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
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div>
        <input type="file" accept=".pdf" multiple onChange={retriveFile} />
      </div>
      <div className="text-black"></div>
      <div className="text-black">{fileNames}</div>
      <div>
        <WalletConnectButton />
        <button
          onClick={handleAddAgent}
          className={isLoading ? "bg-red-400" : "bg-sky-950"}
        >
          Add Agent
        </button>
      </div>
    </div>
  );
}

export default Page;
