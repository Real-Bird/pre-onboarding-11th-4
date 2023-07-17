import { MagnifyingGlass } from "@components/assets";
import { Input } from "@components/commons";
import { ChangeEvent, useRef } from "react";

const SearchInput = ({
  isFocus,
  onFocus,
  onBlur,
  onChange,
}: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
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
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;

interface SearchInputProps {
  isFocus: boolean;
  onFocus: () => void;
  onBlur: () => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
