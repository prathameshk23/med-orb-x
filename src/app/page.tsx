import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session?.user.role === "doctor") redirect("/dashboard/doctor");
  if (session?.user.role === "patient") redirect("/dashboard/patient");
  return (
    <>
      <Hero />
    </>
  );
}
