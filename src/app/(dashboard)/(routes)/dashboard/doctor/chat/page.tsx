import Image from "next/image";

function Page() {
  return (
    <section className="ml-[9rem] pt-[5.55rem]">
      <div className="bg-purple-500/30 backdrop-blur-lg w-[65vw] min-h-[85vh] rounded-lg">
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
            Connect with your patients anytime you need.
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
