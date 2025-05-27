import { cn } from "@/lib/utils";
import React from "react";

const CustomButton = ({ children, className }) => {
  return (
    <button
      className={cn(
        "bg-tancolor px-6 py-2 rounded-4xl cursor-pointer btn border-0",
        className
      )}
    >
      {children}
    </button>
  );
};

export default CustomButton;
