"use client";
import { cn } from "@/lib/utils";
import * as React from "react";
import { FC } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useContractContext } from "@/context/contractContext";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

const SignOut: FC<UserAuthFormProps> = ({ text, className, ...props }) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { SigningOut } = useContractContext();
  const SignOut = async () => {
    setIsLoading(true);
    try {
      await SigningOut();
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
      <Button type="button" size="sm" onClick={SignOut} disabled={isLoading}>
        {isLoading ? null : <LogOutIcon className="h-4 w-4 mr-2" />}
        {text}
      </Button>
    </div>
  );
};

export default SignOut;
