"use client";
import React from "react";
import SidebarSignout from "./SidebarSignout";
import { Home, MessageCircle, UsersRound } from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Home", href: "/dashboard/doctor", icon: Home },
  { name: "Patients", href: "/dashboard/doctor/patients", icon: UsersRound },
  { name: "Chat", href: "/dashboard/doctor/chat", icon: MessageCircle },
];

function SideBar() {
  const pathname = usePathname();
  return (
    <aside className="fixed flex left-0 w-fit bg-white bg-opacity-20 m-4 rounded-xl min-h-[95vh] backdrop-blur-3xl drop-shadow-lg shadow">
      <div className="flex flex-col justify-between items-center p-3">
        <div className="flex flex-col gap-0 justify-center items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            <Link href={"/"}>
              <div>Med</div>
              <div>OrbX</div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-5 justify-center items-center">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <TooltipProvider key={link.href}>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href={link.href}
                      key={link.name}
                      className={clsx(
                        "flex h-[48px] grow items-center justify-center gap-2 rounded-[10px] p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                        {
                          "bg-purple-400 text-sky-100": pathname === link.href,
                        },
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </Link>
                    <TooltipContent
                      side="right"
                      className="bg-purple-200 rounded-full right-0 text-md"
                    >
                      {link.name}
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
        <div className="flex flex-col justify-center items-center mt-32">
          <SidebarSignout />
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
