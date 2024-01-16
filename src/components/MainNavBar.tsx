import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/Drawer";
import { Button } from "./ui/Button";

function MainNavBar() {
  return (
    <nav className="lg:bg-transparent flex flex-row justify-between lg:px-36 lg:pt-14 p-5">
      <div className="lg:text-black lg:text-xl font-bold text-md">
        MedOrbX
        <sup className="rounded-full p-1 bg-purple-500 font-normal text-sm text-muted">
          beta
        </sup>
      </div>
      <div className="lg:hidden bg-black text-white">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
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
