import { useSearchContext } from "@contexts/search";
import { useRef, useState, KeyboardEvent, useEffect } from "react";

export default function useMoveListKeyDown(
  filteredListLength: number,
  resetTrigger: boolean
) {
  const formRef = useRef<HTMLFormElement>(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { searchValue } = useSearchContext();
  const onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    if (!searchValue) {
      setCurrentIndex(-1);
      return;
    }
    if (e.code === "ArrowDown") {
      e.preventDefault();
      setCurrentIndex((prev) => Math.min(prev + 1, filteredListLength));
    } else if (e.code === "ArrowUp") {
      e.preventDefault();
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  useEffect(() => {
    if (formRef.current) {
      const allOfLi = formRef.current.querySelectorAll("li");
      allOfLi.forEach((li, idx) => {
        if (idx === currentIndex) {
          li.classList.add("bg-gray-100");
        } else {
          li.classList.remove("bg-gray-100");
        }
      });
    }
    if (resetTrigger) {
      setCurrentIndex(-1);
    }
  }, [currentIndex, resetTrigger]);

  return { formRef, onKeyDown };
}
