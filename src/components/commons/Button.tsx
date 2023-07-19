import type { HTMLAttributes, ReactNode } from "react";

export const Button = ({ children, ...btnAttbs }: ButtonProps) => {
  return (
    <button type="button" {...btnAttbs}>
      {children}
    </button>
  );
};

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}
