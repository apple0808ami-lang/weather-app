import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-[1.4rem] border border-white/60 p-6 shadow-[0_24px_50px_-32px_rgba(15,23,42,0.45)]",
        className,
      )}
      {...props}
    />
  );
}
