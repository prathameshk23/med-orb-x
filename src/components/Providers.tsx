"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import {
  ThirdwebProvider,
  coinbaseWallet,
  en,
  metamaskWallet,
} from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import ContractContextProvider from "@/context/ContractContextProvider";

interface LayoutProps {
  children: ReactNode;
}

const Providers: FC<LayoutProps> = ({ children }) => {
  return (
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
      locale={en()}
      supportedWallets={[
        metamaskWallet({ recommended: true }),
        coinbaseWallet(),
      ]}
    >
      <SessionProvider>
        <ContractContextProvider>{children}</ContractContextProvider>
      </SessionProvider>
    </ThirdwebProvider>
  );
};

export default Providers;
