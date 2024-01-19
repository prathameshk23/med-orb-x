import { db } from "@/lib/db";
import Image from "next/image";

async function SearchPage({
  searchParams,
}: {
  searchParams: { username?: string };
}) {
  const searchQuerry = searchParams.username ?? "";
  const user = await db.user.findUnique({
    where: { username: searchQuerry },
  });
  return (
    <main className="flex flex-col justify-center lg:px-36 items-center min-h-screen">
      {user ? (
        <div className="flex flex-col items-center justify-center">
          <Image
            width={40}
            height={40}
            src={user.image as string}
            alt={user.username as string}
            className="rounded-full h-40 w-40"
          />
          <h1 className="text-3xl font-bold mt-4">{user.username}</h1>
          <p className="text-xl mt-2">{user.name}</p>
        </div>
      ) : (
        <h1 className="text-3xl font-bold mt-4">User not found</h1>
      )}
    </main>
  );
}

export default SearchPage;
