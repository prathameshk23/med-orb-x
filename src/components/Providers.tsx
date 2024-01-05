"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";

interface LayoutProps {
  children: ReactNode;
}

const Providers: FC<LayoutProps> = ({ children }) => {
  return (
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    >
      <SessionProvider>{children}</SessionProvider>
    </ThirdwebProvider>
  );
};

export default Providers;
