"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContractContext } from "@/context/contractContext";
import { cn } from "@/lib/utils";
import {
  useAddress,
  useContractWrite,
  useStorageUpload,
} from "@thirdweb-dev/react";
import { Loader2, Upload } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

function UploadRecords({ patientAddr }: { patientAddr: string }) {
  const [isfile, setFiles] = useState<File>();
  const [fileName, setFileName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: upload } = useStorageUpload();
  const address = useAddress();
  const { contract } = useContractContext();
  const { mutateAsync: uploadRecord } = useContractWrite(
    contract,
    "uploadRecord",
  );
  const router = useRouter();

  const retriveFile = (e: ChangeEvent<HTMLInputElement>) => {
    const data = e.target.files;
    if (data) {
      setFiles(data[0]);
      setFileName(data[0].name);
    }
    e.preventDefault();
  };

  const uploadFile = async () => {
    const Url = await upload({
      data: [isfile],
      options: {
        uploadWithGatewayUrl: true,
      },
    });
    return Url;
  };

  const handleUpload = async () => {
    setIsLoading(true);
    const uri = await uploadFile();
    const recordHash = uri[0];
    try {
      await uploadRecord({
        args: [patientAddr, fileName, recordHash],
      });
    } catch (err) {
      console.error("contract call failure", err);
    }
    setIsLoading(false);
    setFileName("");
    setFiles(undefined);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col gap-8">
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
        <div className="flex justify-center items-center flex-col gap-4">
          <div className="bg-purple-300 p-4 rounded-full text-black">
            {fileName.length > 0 ? <p>{fileName}</p> : <p>No files selected</p>}
          </div>
          <Button
            disabled={!address}
            className={cn(
              buttonVariants({ variant: "default" }),
              `w-full rounded-full ${
                isLoading
                  ? "bg-gray-600 cursor-default hover:bg-gray-600"
                  : "bg-gradient-to-r from-violet-500 to-fuchsia-500"
              }`,
            )}
            onClick={handleUpload}
          >
            {isLoading ? (
              <Loader2 className="w-10 h-10 text-black animate-spin" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
        <div className="flex justify-center items-center"></div>
      </div>
    </div>
  );
}

export default UploadRecords;
