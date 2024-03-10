import { db } from "@/lib/db";
import Image from "next/image";

async function SearchPage({
  searchParams,
}: {
  searchParams: { username?: string };
}) {
  const searchQuerry = searchParams.username ?? "";
  const users = await db.user.findMany({
    where: {
      AND: [
        {
          username: {
            contains: searchQuerry as string,
          },
          // role: "doctor",
        },
      ],
    },
  });
  return (
    <main className="flex flex-col justify-center lg:px-36 items-center min-h-screen">
      {users ? (
        users.map((user) => (
          <div key={user.id} className="border p-4 my-4">
            <div className="flex items-center mb-2">
              <Image
                src={user.image as string}
                alt={user.name as string}
                height={100}
                width={100}
                className="rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold">{user.name || "No Name"}</h2>
                <p className="text-gray-500">
                  @{user.username || "No Username"}
                </p>
              </div>
            </div>
            <div>
              <p>Email: {user.email || "No Email"}</p>
              <p>Role: {user.role || "No Role"}</p>
              <p>Created At: {user.createdAt.toDateString()}</p>
              <p>Updated At: {user.updatedAt.toDateString()}</p>
              <p>Address {user.address}</p>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-3xl font-bold mt-4">User not found</h1>
      )}
    </main>
  );
}

export default SearchPage;
