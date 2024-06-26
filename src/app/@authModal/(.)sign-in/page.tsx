import CloseModal from "@/components/CloseModal";
import SignInPage from "@/components/SignInPage";
import { FC } from "react";

const page: FC = () => {
  return (
    <div className="fixed inset-0 z-10">
      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white bg-opacity-20 backdrop-blur-xl shadow drop-shadow-lg w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute top-4 right-4 ">
            <CloseModal />
          </div>
          <SignInPage />
        </div>
      </div>
    </div>
  );
};

export default page;
