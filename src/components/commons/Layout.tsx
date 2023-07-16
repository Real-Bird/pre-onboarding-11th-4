import type { ReactNode } from "react";

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="bg-[#CAE9FF] flex flex-col justify-center items-center w-full h-1/2 relative">
      {children}
    </main>
  );
};

interface LayoutProps {
  children: ReactNode;
}
