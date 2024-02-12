import ShowDoctors from "@/components/show-doctors";
import React from "react";

function Page() {
  return (
    <section className="py-24 lg:ml-[100px] 2xl:ml-0">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">Doctors</h1>
        <ShowDoctors />
      </div>
    </section>
  );
}

export default Page;
