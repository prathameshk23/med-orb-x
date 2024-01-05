import { Icons } from "@/components/Icons";
import WalletConnectButton from "@/components/WalletConnectButton";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4">
      <Icons.logo className="mx-auto h-8 w-8" />
      <Link
        href="/sign-in"
        className={cn(buttonVariants({ variant: "default" }), "rounded-lg")}
      >
        Get Started
      </Link>
      <WalletConnectButton />
    </main>
  );
}
