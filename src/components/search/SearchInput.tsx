import { MagnifyingGlass } from "@components/assets";
import { Input } from "@components/commons";
import { useSearchContext } from "@contexts/search";
import { ChangeEvent, KeyboardEvent, RefObject, useCallback } from "react";

const preventArrowKey = ["ArrowUp", "ArrowDown"];

const SearchInput = ({
  isFocus,
  onFocus,
  onBlur,
  inputRef,
}: SearchInputProps) => {
  const { searchValue, setSearchValue } = useSearchContext();

  const handleSearchValueChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),
    []
  );
  const handlePreventInputArrowKey = useCallback((e: KeyboardEvent) => {
    if (preventArrowKey.includes(e.code)) {
      e.preventDefault();
    }
  }, []);
  return (
    <div
      className="relative flex items-center p-5 w-full flex-1"
      onClick={() => inputRef.current?.focus()}>
      {!isFocus && (
        <div className="absolute mr-2 flex items-center space-x-3">
          <MagnifyingGlass className="h-4 w-4 text-gray-400" />
          <div className="text-gray-400">질환명을 입력해 주세요.</div>
        </div>
      )}
      <Input
        ref={inputRef}
        className="w-full outline-none"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={handleSearchValueChange}
        value={searchValue}
        onKeyDown={handlePreventInputArrowKey}
      />
    </div>
  );
};

export default SearchInput;

interface SearchInputProps {
  isFocus: boolean;
  onFocus: () => void;
  onBlur: () => void;
  inputRef: RefObject<HTMLInputElement>;
}
