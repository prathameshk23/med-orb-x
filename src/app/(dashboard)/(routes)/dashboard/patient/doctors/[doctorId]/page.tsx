import DoctorTableRenderer from "@/components/doctor-record-table";
import GrantAccess from "@/components/permit-access";
import { db } from "@/lib/db";

async function Page({ params }: { params: { doctorId?: string } }) {
  const doctorAddress = params.doctorId;
  const data = await db.user.findUnique({
    where: {
      address: doctorAddress,
    },
  });
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-4">
      <div>Name: {data?.name}</div>
      <div>Email: {data?.email}</div>
      <div>Username: {data?.username}</div>
      <div>Address: {data?.address}</div>
      <DoctorTableRenderer docterAddress={doctorAddress as string} />
      <GrantAccess doctorAddr={doctorAddress} />
    </div>
  );
}

export default Page;
