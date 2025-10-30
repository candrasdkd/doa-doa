import * as React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "primary";
  size?: "sm" | "md" | "lg";
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const base = "inline-flex items-center justify-center gap-2 rounded-xl transition-colors";
    const variants = {
      default: "border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800",
      outline: "border border-neutral-300 dark:border-neutral-700 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800",
      ghost: "bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800",
      primary: "bg-black text-white dark:bg-white dark:text-black hover:opacity-90"
    }[variant];
    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-3.5 py-2",
      lg: "px-4 py-2.5 text-base"
    }[size];
    return <button ref={ref} className={clsx(base, variants, sizes, className)} {...props} />;
  }
);
Button.displayName = "Button";
