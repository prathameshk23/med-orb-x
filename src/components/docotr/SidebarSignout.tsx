"use client";
import { useContractContext } from "@/context/contractContext";
import { LogOut } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

function SidebarSignout() {
  const { SigningOut } = useContractContext();
  return (
    <Button
      className="bg-transparent hover:bg-transparent"
      onClick={async () => await SigningOut()}
    >
      <LogOut className="h-6 w-6 bg-transparent" />
    </Button>
  );
}

export default SidebarSignout;
