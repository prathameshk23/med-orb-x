"use client";

import { ConnectWallet } from "@thirdweb-dev/react";

function WalletConnectButton() {
  return (
    <ConnectWallet
      theme={"dark"}
      modalTitle={"Connect To MedOrbX"}
      modalSize={"compact"}
      welcomeScreen={{ title: "" }}
      className="bg-gradient-to-r from-violet-500 to-fuchsia-500 w-full rounded-full"
    />
  );
}

export default WalletConnectButton;
