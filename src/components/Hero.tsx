import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";

async function Hero() {
  return (
    <main className="flex flex-col justify-center lg:px-36 items-center min-h-screen">
      <section className="flex flex-col justify-between gap-8">
        <div className="flex flex-col">
          <h1 className="flex justify-center lg:text-6xl font-bold text-2xl">
            Empowering Healthcare
          </h1>
          <p className="flex text-center items-center justify-center">
            Innovative Medical Records Management for a Healthier Tomorrow
          </p>
        </div>
        <Link
          href="/sign-in"
          className={cn(
            buttonVariants({ variant: "default" }),
            "rounded-lg m-auto",
          )}
        >
          Get Started
        </Link>
      </section>
    </main>
  );
}

export default Hero;
