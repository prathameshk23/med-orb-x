import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
async function Hero() {
  return (
    <header className="relative min-h-screen">
      <div className="absolute inset-0 bottom-10 bg-bottom bg-no-repeat bg-[#0B1120] bg-hero-image min-h-screen">
        <div
          className="absolute inset-0 bg-grid-slate-900 bg-bottom border-b border-slate-100/5 opacity-50"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
          }}
        />
      </div>
      <main className="relative flex flex-col justify-center lg:px-36 items-center min-h-screen text-slate-100">
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
              "rounded-lg m-auto bg-slate-100 text-black border-2 border-black shadow-[0_35px_60px_-15px_rgba(23,34,22,44)]",
            )}
          >
            Get Started
          </Link>
        </section>
      </main>
    </header>
  );
}

export default Hero;
