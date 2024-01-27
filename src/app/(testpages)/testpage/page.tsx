import { db } from "@/lib/db";
import React from "react";

async function Page() {
  const userIds = ["clru6iszo0000ab0z5v89lv3c", "clru86yut0003ab0zhis2ig2p"];
  const fetchedUsers = await db.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
  });
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">User List</h1>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          id="userContainer"
        >
          {fetchedUsers.map((user) => (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-lg font-bold">User ID: {user.id}</p>
              <p>Email: {user.email}</p>
              <p>Name: {user.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
