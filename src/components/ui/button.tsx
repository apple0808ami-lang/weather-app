import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-slate-700",
        "bg-gradient-to-b from-pastel-cream to-pastel-peach shadow-[0_8px_0_0_rgba(244,198,177,0.95),0_18px_30px_-20px_rgba(15,23,42,0.45)]",
        "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_0_0_rgba(244,198,177,0.95),0_20px_32px_-18px_rgba(15,23,42,0.5)]",
        "active:translate-y-0.5 active:shadow-[0_4px_0_0_rgba(244,198,177,0.95),0_10px_20px_-16px_rgba(15,23,42,0.4)]",
        "disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
