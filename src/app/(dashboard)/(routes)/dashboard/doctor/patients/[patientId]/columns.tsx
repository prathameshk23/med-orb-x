"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Records = {
  content: string;
  name: string;
  timestamp: number;
  uploader: string;
};

export const columns: ColumnDef<Records>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "uploader",
    header: "Uploaded By",
  },
  {
    accessorKey: "timestamp",
    header: "Date",
  },
  {
    accessorKey: "content",
    header: "Records",
    cell: ({ row }) => (
      <Link href={row.getValue("content")} target="_blank">
        View Record
      </Link>
    ),
  },
];
