import PatientTableRenderer from "@/components/patient-record-table";
import UploadRecords from "@/components/upload-records";
import { db } from "@/lib/db";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadCloud } from "lucide-react";

async function Page({ params }: { params: { patientId?: string } }) {
  const patientAddress = params.patientId;
  const data = await db.user.findUnique({
    where: {
      address: patientAddress,
    },
  });
  return (
    <main>
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <div>Name: {data?.name}</div>
        <div>Email: {data?.email}</div>
        <div>Username: {data?.username}</div>
        <div>Address: {data?.address}</div>
        <PatientTableRenderer patientAddress={patientAddress as string} />
      </div>
      <div className="fixed bottom-0 right-0 mr-28 mb-16">
        <Dialog>
          <DialogTrigger>
            <div className="rounded-full p-4 bg-pink-300 text-black hover:bg-purple-700 hover:text-white">
              <UploadCloud className="h-8 w-8" />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="flex justify-center items-center">
              <DialogTitle>Upload Records</DialogTitle>
              <DialogDescription>Upload one record at a time</DialogDescription>
            </DialogHeader>
            <div className="flex justify-center items-center">
              <UploadRecords patientAddr={patientAddress as string} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}

export default Page;
