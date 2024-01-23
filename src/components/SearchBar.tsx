"use client";
import { SearchIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDebounce } from "use-debounce";

function SearchBar() {
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [query] = useDebounce(search, 500);
  const { data: session } = useSession();

  useEffect(() => {
    if (!query) {
      if (session?.user.role === "patient") {
        router.replace(`/dashboard/patient`);
      }
      if (session?.user.role === "doctor") {
        router.replace(`/dashboard/doctor`);
      }
      router.replace(`/`);
    } else {
      router.replace(`/search?username=${query}`);
    }
  }, [query, router]);

  return (
    <div className="flex flex-row gap-5 rounded-full p-1 border-black border">
      <SearchIcon />
      <input
        type="text"
        placeholder="username"
        className="bg-transparent border-none outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
