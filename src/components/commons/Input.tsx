import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ ...inputAttbs }, ref) => {
  return <input type="search" ref={ref} {...inputAttbs} />;
});
