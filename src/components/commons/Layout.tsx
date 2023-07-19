import type { ReactNode } from "react";

export const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="bg-[#CAE9FF] flex flex-col justify-center items-center w-full h-[50vh] relative space-y-20 pt-20 pb-32">
      {children}
    </main>
  );
};

interface LayoutProps {
  children: ReactNode;
}
