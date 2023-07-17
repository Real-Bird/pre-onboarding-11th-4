import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  HTMLAttributes<HTMLInputElement>
>(({ ...inputAttrs }, ref) => {
  return <input type="search" ref={ref} {...inputAttrs} />;
});
