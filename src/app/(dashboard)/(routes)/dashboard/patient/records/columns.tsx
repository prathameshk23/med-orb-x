"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    header: ({ column }) => {
      return (
        <Button
          className="text-black text-xl hover:bg-transparent hover:text-black"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "uploader",
    header: ({ column }) => {
      return (
        <Button
          className="text-black text-xl hover:bg-transparent hover:text-black"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Uploaded By
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "timestamp",
    header: ({ column }) => {
      return (
        <Button
          className="text-black text-xl hover:bg-transparent hover:text-black"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "content",
    header: ({ column }) => {
      return <div className="text-black">Records</div>;
    },
    cell: ({ row }) => (
      <Link href={row.getValue("content")} target="_blank">
        View Record
      </Link>
    ),
  },
];
