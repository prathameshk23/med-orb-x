import React from "react";
import DoctorForm from "./_components/DoctorForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PatientForm from "./_components/PatientForm";
import MainNavBar from "@/components/MainNavBar";

async function Page() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <MainNavBar />
      {session?.user.role === "doctor" ? <DoctorForm /> : <PatientForm />}
    </div>
  );
}

export default Page;
