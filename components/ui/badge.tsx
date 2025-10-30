import * as React from "react";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  active?: boolean;
};

export function Badge({ className, active, ...props }: Props) {
  return (
    <span
      className={clsx(
        "badge",
        active && "bg-black text-white dark:bg-white dark:text-black border-transparent",
        className
      )}
      {...props}
    />
  );
}
