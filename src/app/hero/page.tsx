/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cJQgwhSa8UN
 */

import { Button } from "@/components/ui/Button";

export default function Component() {
  return (
    <div
      key="1"
      className="bg-[#2d1e59] text-white w-full min-h-screen p-8 md:p-16"
    >
      <nav className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-16">
        <div className="text-2xl font-bold relative mb-6 md:mb-0">
          MedOrbX
          <span className="absolute top-0 right-[-40px] bg-red-500 text-xs text-white px-1 rounded-full">
            Beta
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mb-6 md:mb-0">
          <a className="hover:underline" href="#">
            Home
          </a>
          <a className="hover:underline" href="#">
            Pricing
          </a>
          <a className="hover:underline" href="#">
            Solutions
          </a>
          <a className="hover:underline" href="#">
            Resources
          </a>
          <a className="hover:underline" href="#">
            About Us
          </a>
        </div>
        <div className="flex items-center gap-4">
          <UserIcon className="text-white h-6 w-6" />
          <ShoppingCartIcon className="text-white h-6 w-6" />
          <MenuIcon className="text-white h-6 w-6" />
        </div>
      </nav>
      <header className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 animate-pulse">
          The Most Secure
          <br />
          Cloud Storage Services
        </h1>
        <p className="text-lg mb-8">
          Secure file storage and collaboration that helps you stay safe, secure
          and connected in the cloud.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-16">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full mb-4 md:mb-0">
            Try It Now
          </Button>
          <Button className="bg-transparent hover:bg-blue-600 text-white py-3 px-6 rounded-md border border-blue-600 hover:border-transparent">
            Learn More
          </Button>
        </div>
      </header>
      <footer className="text-center text-sm">
        <p>The World's Leading Media Talk About Us:</p>
        <p className="text-blue-300">@innovationsync | Follow for more</p>
      </footer>
    </div>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
