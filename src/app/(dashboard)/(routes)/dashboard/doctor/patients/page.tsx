import ShowPatients from "@/components/show-patients";
import React from "react";

function Page() {
  return (
    <section className="py-24 lg:ml-[100px] 2xl:ml-0">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">Patients</h1>
        <ShowPatients />
      </div>
    </section>
  );
}

export default Page;
