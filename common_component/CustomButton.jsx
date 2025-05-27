import { cn } from "@/lib/utils";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
const CustomButton = ({
  children,
  className,
  clickHandler,
  isLoading = false,
}) => {
  return (
    <button
      className={cn(
        "bg-tancolor px-6 py-2 rounded-4xl cursor-pointer btn border-0",
        className
      )}
      onClick={clickHandler}
    >
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            className="loading loading-spinner loading-xs"
            exit={{ opacity: 0 }}
          />
        ) : (
          <motion.div exit={{ opacity: 0 }} className="flex items-center gap-2">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default CustomButton;
