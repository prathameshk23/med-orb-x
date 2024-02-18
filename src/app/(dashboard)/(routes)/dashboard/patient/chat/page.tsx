import Image from "next/image";
import React from "react";

function Page() {
  return (
    <section className="2xl:ml-[9rem] 2xl:pt-[5.55rem] lg:ml-[7rem] lg:pt-[5rem]">
      <div className="bg-purple-500/30 backdrop-blur-lg 2xl:w-[65vw] lg:w-[63vw] min-h-[85vh] rounded-lg">
        <div className="p-4 text-xl flex flex-col justify-center items-center h-[85vh] gap-4">
          <div>
            <Image
              src={"/chat.svg"}
              alt={"Chat Icon"}
              width={400}
              height={400}
            />
          </div>
          <div className="text-gray-300">
            Connect with your doctors anytime you need.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
