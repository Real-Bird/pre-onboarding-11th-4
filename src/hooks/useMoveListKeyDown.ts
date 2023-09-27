import { useSearchContext } from "@contexts/search";
import { useState, KeyboardEvent, useEffect, useCallback } from "react";

export default function useMoveListKeyDown(
  filteredListLength: number,
  resetTrigger: boolean
) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { searchValue } = useSearchContext();
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!searchValue) {
        setCurrentIndex(-1);
        return;
      }
      if (e.code === "ArrowDown") {
        setCurrentIndex((prev) => {
          return Math.min(prev + 1, filteredListLength);
        });
      } else if (e.code === "ArrowUp") {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    },
    [filteredListLength]
  );
  useEffect(() => {
    if (resetTrigger) {
      setCurrentIndex(-1);
    }
  }, [resetTrigger]);

  return { onKeyDown, currentIndex };
}
