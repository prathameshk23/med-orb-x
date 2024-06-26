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
      router.replace(`/dashboard/patient/search`);
    } else {
      router.replace(`/dashboard/patient/search?username=${query}`);
    }
  }, [query, router, session?.user.role]);

  return (
    <div className="flex flex-row gap-5 rounded-full p-4 border-black border bg-pink-100 text-black absolute top-20">
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
