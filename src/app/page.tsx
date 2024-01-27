import Hero from "@/components/Hero";
import MainNavBar from "@/components/MainNavBar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session?.user.role === "doctor") redirect("/dashboard/doctor");
  if (session?.user.role === "patient") redirect("/dashboard/patient");
  return (
    <>
      <MainNavBar />
      <Hero />
    </>
  );
}
