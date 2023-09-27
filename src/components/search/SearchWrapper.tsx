import { SearchListWrapper } from "@components/search";
import SearchButton from "@components/search/SearchButton";
import SearchInput from "@components/search/SearchInput";
import { SearchNone } from "@components/search/SearchNone";
import { useSearchContext } from "@contexts/search";
import useMoveListKeyDown from "@hooks/useMoveListKeyDown";
import useSickSearch from "@hooks/useSickSearch";
import { useState, type FormEvent, useRef } from "react";
import { cls } from "utils";

export const Search = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [isListHover, setIsListHover] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchValue } = useSearchContext();
  const { state, loading } = useSickSearch();
  const filteredList = state?.response
    ?.filter((sick) => sick.sickNm.includes(searchValue))
    .sort((a, b) => a.sickNm.length - b.sickNm.length)
    .slice(0, 7);

  const { currentIndex, onKeyDown } = useMoveListKeyDown(
    filteredList?.length || -1,
    !isFocus
  );

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const onInputFocus = () => {
    setIsFocus(true);
  };
  const onInputBlur = () => {
    if (isListHover) {
      inputRef.current?.focus();
      return;
    }
    setIsFocus(false);
  };

  return (
    <form
      className={cls(
        isFocus ? "ring-[#007BE9] ring-2" : "",
        "w-full relative mx-auto flex bg-white max-w-lg rounded-full items-center justify-between"
      )}
      onSubmit={onSearchSubmit}
      onKeyDown={onKeyDown}>
      <SearchInput
        inputRef={inputRef}
        isFocus={isFocus || !!searchValue}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
      />
      <div className="pr-2">
        <SearchButton />
      </div>
      {isFocus && (
        <div
          id="searchListBox"
          className={cls(
            searchValue ? "h-fit" : "h-52",
            "absolute mx-auto bg-white top-20 left-0 right-0 rounded-3xl shadow-lg z-10"
          )}
          onMouseEnter={() => setIsListHover(true)}
          onMouseLeave={() => setIsListHover(false)}>
          {searchValue ? (
            <SearchListWrapper
              sickList={filteredList}
              searchValue={searchValue}
              isLoading={loading}
              currentIndex={currentIndex}
            />
          ) : (
            <SearchNone />
          )}
        </div>
      )}
    </form>
  );
};
