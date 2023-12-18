"use client";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import * as React from "react";
import { FC } from "react";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import { LogOutIcon } from "lucide-react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const SignOut: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const SigningOut = async () => {
    setIsLoading(true);
    try {
      await signOut({
        callbackUrl: "/",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button type="button" size="sm" onClick={SigningOut} disabled={isLoading}>
        {isLoading ? null : <LogOutIcon className="h-4 w-4 mr-2" />}
        Sign Out
      </Button>
    </div>
  );
};

export default SignOut;
