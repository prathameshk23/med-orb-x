import DoctorTableRenderer from "@/components/doctor-record-table";
import GrantAccess from "@/components/permit-access";
import ShowPrescription from "@/components/show-prescriptions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { db } from "@/lib/db";
import Image from "next/image";

async function Page({ params }: { params: { doctorId?: string } }) {
  const doctorAddress = params.doctorId;
  const data = await db.user.findUnique({
    where: {
      address: doctorAddress,
    },
  });
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <div className="flex flex-col gap-4 bg-purple-300 backdrop-blur-md p-8 rounded-lg text-black">
        <div>
          <div className="flex flex-row justify-start items-center gap-2">
            <Image
              src={data?.image as string}
              alt="avatar"
              width={60}
              height={60}
              className="rounded-full"
            />
            <p>Dr. {data?.name}</p>
          </div>
        </div>
        <div>
          <div>Email: {data?.email}</div>
          <div>Username: {data?.username}</div>
          <div>Address: {data?.address}</div>
        </div>
        <div className="flex justify-center items-center">
          <Dialog>
            <DialogTrigger>
              <div className="hover:bg-pink-300 hover:text-black bg-purple-700 text-white p-2 rounded-md">
                Show Prescription
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="flex justify-center items-center">
                <DialogTitle>Prescription</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center items-center">
                <ShowPrescription doctorAddr={doctorAddress as string} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <GrantAccess doctorAddr={doctorAddress} />
      <DoctorTableRenderer docterAddress={doctorAddress as string} />
    </div>
  );
}

export default Page;
