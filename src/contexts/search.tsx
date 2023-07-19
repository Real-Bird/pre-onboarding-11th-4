import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";

const SearchContext = createContext<SearchContextType>({
  searchValue: "",
  setSearchValue: () => null,
});
export const useSearchContext = () => useContext(SearchContext);

const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};

interface SearchProviderProps {
  children: ReactNode;
}

type SearchContextType = {
  searchValue: string;
  setSearchValue: Dispatch<string>;
};

export default SearchProvider;
