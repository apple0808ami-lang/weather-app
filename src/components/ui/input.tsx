import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-sky-100 bg-white/85 px-4 py-3 text-slate-700",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_24px_-20px_rgba(30,41,59,0.45)]",
        "outline-none transition-all duration-200 placeholder:text-slate-400",
        "focus:border-sky-300 focus:ring-4 focus:ring-sky-100",
        className,
      )}
      {...props}
    />
  );
}
