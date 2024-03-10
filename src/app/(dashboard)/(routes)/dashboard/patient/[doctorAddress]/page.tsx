import GrantAccess from "@/components/permit-access";
import { db } from "@/lib/db";
import Image from "next/image";

async function Page({ params }: { params: { doctorAddress?: string } }) {
  const doctorAddress = params.doctorAddress;
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
          <div>Email: {data?.email}</div>
        </div>
        <div>
          <div>Username: {data?.username}</div>
          <div>Address: {data?.address}</div>
        </div>
      </div>
      <GrantAccess doctorAddr={doctorAddress} />
    </div>
  );
}

export default Page;
