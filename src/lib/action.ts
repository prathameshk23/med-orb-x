"use server";

import { getServerSession } from "next-auth";
import { db } from "./db";
import { authOptions } from "./auth";

export async function addUsername(formData: FormData) {
  const session = await getServerSession(authOptions);
  const id = session?.user.id;
  const data = {
    username: formData.get("username"),
    address: formData.get("address"),
  };
  try {
    if (!session?.user.username) {
      await db.user.update({
        where: {
          id: id,
        },
        data: {
          username: data.username as string,
          address: data.address as string,
        },
      });
    }
  } catch (error) {
    console.error(error);
  }
}
