import SearchButton from "@components/search/SearchButton";
import SearchInput from "@components/search/SearchInput";

export const Search = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <SearchInput />
      <SearchButton />
    </form>
  );
};
