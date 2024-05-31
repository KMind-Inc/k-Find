import { cn } from "@/app/tools/cn";
import { HTMLAttributes } from "react";

function AnimationEffect({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { AnimationEffect };
