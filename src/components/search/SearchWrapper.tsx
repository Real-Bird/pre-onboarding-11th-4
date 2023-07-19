import { SearchListWrapper } from "@components/search";
import SearchButton from "@components/search/SearchButton";
import SearchInput from "@components/search/SearchInput";
import { SearchNone } from "@components/search/SearchNone";
import { useSearchContext } from "@contexts/search";
import useMoveListKeyDown from "@hooks/useMoveListKeyDown";
import useSickSearch from "@hooks/useSickSearch";
import { useState } from "react";
import { cls } from "utils";

export const Search = () => {
  const [isFocus, setIsFocus] = useState(false);
  const { searchValue } = useSearchContext();
  const { state, loading } = useSickSearch();
  const filteredList = state?.response?.filter((sick) =>
    sick.sickNm.includes(searchValue)
  );

  const { formRef, onKeyDown } = useMoveListKeyDown(
    filteredList?.length || -1,
    !isFocus
  );

  return (
    <form
      ref={formRef}
      className={cls(
        isFocus ? "ring-[#007BE9] ring-2" : "",
        "w-full relative mx-auto flex bg-white max-w-lg rounded-full items-center justify-between"
      )}
      onSubmit={(e) => e.preventDefault()}
      onKeyDown={onKeyDown}>
      <SearchInput
        isFocus={isFocus || !!searchValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      <div className="pr-2">
        <SearchButton />
      </div>
      {isFocus && (
        <div
          className={cls(
            searchValue ? "h-fit" : "h-52",
            "absolute mx-auto bg-white top-20 left-0 right-0 rounded-3xl shadow-lg"
          )}>
          {searchValue ? (
            <SearchListWrapper
              sickList={state?.response}
              searchValue={searchValue}
              isLoading={loading}
            />
          ) : (
            <SearchNone />
          )}
        </div>
      )}
    </form>
  );
};
