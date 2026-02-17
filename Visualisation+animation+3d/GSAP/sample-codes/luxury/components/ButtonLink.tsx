import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { Link } from "next-view-transitions";

export type ButtonLinkProps = {
  className?: string;
  variant?: "Primary" | "Secondary";
  href?: string;
  title?: string;
  icon?: LucideIcon;
};

export const ButtonLink = ({
  className,
  variant = "Primary",
  href = "#",
  title = "Shop Now",
  icon,
  ...restProps
}: ButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={clsx(
        "inline-flex items-center justify-center px-12 py-4 text-center font-extrabold tracking-wider uppercase transition-colors duration-300",
        variant === "Secondary"
          ? "border border-white text-white hover:bg-white/20"
          : "bg-white text-black hover:bg-white/80",
        className,
      )}
      {...restProps}
    >
      {title}
    </Link>
  );
};