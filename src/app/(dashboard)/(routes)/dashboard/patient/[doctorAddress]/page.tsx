import GrantAccess from "@/components/permit-access";
import { db } from "@/lib/db";

async function Page({ params }: { params: { doctorAddress?: string } }) {
  const doctorAddress = params.doctorAddress;
  const data = await db.user.findUnique({
    where: {
      address: doctorAddress,
    },
  });
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div>Name: {data?.name}</div>
      <div>Email: {data?.email}</div>
      <div>Username: {data?.username}</div>
      <div>Address: {data?.address}</div>
      <GrantAccess doctorAddr={doctorAddress} />
    </div>
  );
}

export default Page;
