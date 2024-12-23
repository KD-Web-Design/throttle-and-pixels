import { Button } from "@/components/ui/button";
import { LoadingButtonProps } from "@/types/types";
import { Loader2 } from "lucide-react";
import React from "react";

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading ? (
        <Loader2 className="animate-spin w-4 h-4 mx-auto" aria-hidden="true" />
      ) : (
        children
      )}
    </Button>
  );
};

export default LoadingButton;
