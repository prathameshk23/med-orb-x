import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-32">
      <Image
        src="/not_found.svg"
        width={500}
        height={500}
        alt="not found page"
      />
      <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
        Go back home
      </Link>
    </main>
  );
}
