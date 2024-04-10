"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContractContext } from "@/context/contractContext";
import { cn } from "@/lib/utils";
import { useAddress, useContractWrite } from "@thirdweb-dev/react";
import { Loader2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import toast from "react-hot-toast";
import { BigNumber } from "ethers";

function AddPrescription({ patientAddr }: { patientAddr: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [medicine, setMedicine] = useState("");
  const [dosage, setDosage] = useState<Number>();
  const [duration, setDuration] = useState<Number>();
  const [instructions, setInstructions] = useState("");
  const address = useAddress();
  const { contract } = useContractContext();
  const { mutateAsync: addPrescription } = useContractWrite(
    contract,
    "addPrescription",
  );

  const handleUpload = async () => {
    setIsLoading(true);
    try {
      await addPrescription({
        args: [patientAddr, medicine, 3, 0, instructions],
      });
      toast.success("Prescription added successfully");
    } catch (err) {
      console.error("contract call failure", err);
    }
    setIsLoading(false);
    setMedicine("");
    setDosage(undefined);
    setInstructions("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col gap-8">
        <form>
          <Label htmlFor="medicine">Medicine</Label>
          <Input
            id="medicine"
            type="text"
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
          />
          <Label htmlFor="dosage">Dosage(times a day)</Label>
          <Input
            id="dosage"
            value={dosage as number}
            onChange={(e) => setDosage(Number(e.target.value))}
          />
          <Label htmlFor="instructions">Instructions</Label>
          <Textarea
            id="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </form>
        <div className="flex flex-col gap-4 justify-center items-center">
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

export default AddPrescription;
