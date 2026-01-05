import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="grid grid-rows-[auto_1fr] [&:nth-child(3)]:p-4">
      {children}
    </div>
  );
};
