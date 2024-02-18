"use server";

import { getServerSession } from "next-auth";
import { db } from "./db";
import { authOptions } from "./auth";
import { pusherServer } from "./pusher";
import { revalidatePath } from "next/cache";

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

export async function getUser(addr: string[]) {
  try {
    const user = await db.user.findMany({
      where: {
        address: {
          in: addr,
        },
      },
    });
    return user;
  } catch (error) {
    return error;
  }
}

export async function addMessage(formData: FormData) {
  const session = await getServerSession(authOptions);
  const id = session?.user.id;
  const data = {
    message: formData.get("message"),
    receiverId: formData.get("receiverId"),
  };
  try {
    const message = await db.message.create({
      data: {
        userId: id,
        message: btoa(data.message as string),
        receiverId: data.receiverId as string,
      },
    });
    await pusherServer.trigger("chat", "message", {
      message: `${JSON.stringify(message)}\n\n`,
    });
    return message;
  } catch (error) {
    return error;
  }
}

export async function getMessages(senderId: string, receiverId: string) {
  try {
    const messages = await db.message.findMany({
      where: {
        OR: [
          { AND: [{ userId: senderId }, { receiverId: receiverId }] },
          { AND: [{ userId: receiverId }, { receiverId: senderId }] },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });
    return messages;
  } catch (error) {
    return error;
  }
}
