import { ReactNode } from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: "section" | "footer";
  fullWidth?: boolean;
  className?: string;
  innerClassName?: string;
  children?: ReactNode;
};

export function Bounded({
  as: Comp = "section",
  fullWidth = false,
  className,
  innerClassName,
  children,
}: BoundedProps) {
  return (
    <Comp
      className={clsx(
        "px-6 py-10 md:py-20 [.header+&]:pt-44 [.header+&]:md:pt-32",
        className,
      )}
    >
      <div
        className={clsx(
          "mx-auto w-full",
          !fullWidth && "max-w-7xl",
          innerClassName,
        )}
      >
        {children}
      </div>
    </Comp>
  );
}