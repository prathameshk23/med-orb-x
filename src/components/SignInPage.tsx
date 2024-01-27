import { Icons } from "@/components/Icons";
import DoctorAuthForm from "./DoctorAuthForm";
import PatientAuthForm from "./PatientAuthForm";

const SignIn = () => {
  return (
    <div className="text-white container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Icons.logo className="mx-auto h-12 w-12" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Login in or create a new account
        </h1>
        <p className="text-sm max-w-xs mx-auto">
          By continuing, you are setting up a Breadit account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <PatientAuthForm />
        <DoctorAuthForm />
      </div>
    </div>
  );
};

export default SignIn;
