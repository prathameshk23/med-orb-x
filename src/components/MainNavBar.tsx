import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/Drawer";
import { Button } from "./ui/Button";
import Link from "next/link";

function MainNavBar() {
  return (
    <nav className="z-[5] lg:bg-transparent flex flex-row justify-between lg:px-36 lg:pt-14 fixed w-[100%] text-white">
      <Link href={"/"}>
        <div className="text-white lg:text-xl font-bold text-md">
          MedOrbX
          <sup className="rounded-full p-1 bg-purple-500 font-normal text-sm text-muted">
            beta
          </sup>
        </div>
      </Link>
      <div className="lg:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="default" className="rounded-full">
              Menu
            </Button>
          </DrawerTrigger>
          <DrawerContent className="text-white bg-black">
            <div className="mx-auto w-full max-w-sm">
              <div>Home</div>
              <div>Doctor</div>
              <div>Patient</div>
              <div>Sign In</div>
            </div>
            <DrawerHeader className="text-white">
              <DrawerTitle>MedOrbX</DrawerTitle>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="lg:flex flex-row gap-20 hidden">
        <div>Home</div>
        <div>Doctor</div>
        <div>Patient</div>
        <div>Sign In</div>
      </div>
    </nav>
  );
}

export default MainNavBar;
