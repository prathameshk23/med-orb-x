"use client";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDebounce } from "use-debounce";

function SearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = React.useState("");
  const [query] = useDebounce(search, 500);

  useEffect(() => {
    if (!query) {
      router.push(pathname.replace("search", ""));
    } else {
      router.push(`/search?username=${query}`);
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
