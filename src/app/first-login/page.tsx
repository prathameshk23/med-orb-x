import React from "react";
import DoctorForm from "./_components/DoctorForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PatientForm from "./_components/PatientForm";
import MainNavBar from "@/components/MainNavBar";
import { redirect } from "next/navigation";

async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  if (session?.user.role === "doctor" && session.user.username) {
    redirect("/dashboard/doctor");
  }

  if (session?.user.role === "patient" && session.user.username) {
    redirect("/dashboard/patient");
  }
  return (
    <div>
      <MainNavBar />
      {session?.user.role === "doctor" ? <DoctorForm /> : <PatientForm />}
    </div>
  );
}

export default Page;
