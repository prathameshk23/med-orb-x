import React from "react";
import TableRenderer from "@/components/table-renderer";

function RecordsPage() {
  return (
    <section className="py-24 lg:ml-[100px] 2xl:ml-0">
      <div className="container">
        <h1 className="mb-6 text-3xl font-bold">Records</h1>
        <TableRenderer />
      </div>
    </section>
  );
}

export default RecordsPage;
