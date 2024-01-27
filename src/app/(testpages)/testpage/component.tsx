"use client";

import { useStorageUpload } from "@thirdweb-dev/react";
import { ChangeEvent, useState } from "react";
import WalletConnectButton from "@/components/WalletConnectButton";
import { useContractContext } from "@/context/contractContext";
import SignOut from "@/components/SignOut";

function Page() {
  const [isfiles, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutateAsync: upload } = useStorageUpload();
  const { addUser } = useContractContext();

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
      username: "kuku",
      designation: 0,
      recordName: fileNames,
      recordContent: uri,
    });
    setIsLoading(false);
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
          className={isLoading ? "bg-red-100" : "bg-sky-300"}
        >
          Add Agent
        </button>
      </div>
      <SignOut />
    </div>
  );
}

export default Page;
