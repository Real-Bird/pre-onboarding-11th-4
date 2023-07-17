import { SearchListItem } from "@components/search/SearchListItem";

export const SearchListWrapper = ({
  searchValue,
  sickList,
}: SearchListProps) => {
  const filteredList = sickList.filter((sick) =>
    sick.sickNm.includes(searchValue)
  );
  return (
    <ul className="space-y-1 w-full py-6">
      <li key="sickNm" className="font-bold">
        <SearchListItem sickNm={searchValue} />
      </li>
      {filteredList.length !== 0 && (
        <span className="text-xs font-semibold px-4">추천 검색어</span>
      )}
      {filteredList
        .sort((a, b) => a.sickNm.length - b.sickNm.length)
        .slice(0, 7)
        .map((sick) => {
          const sickName = sick.sickNm.replace(
            searchValue,
            `<strong class="font-bold">${searchValue}</strong>`
          );
          return (
            <li key={sick.sickCd}>
              <SearchListItem sickNm={sickName} />
            </li>
          );
        })}
    </ul>
  );
};

type SickData = {
  sickCd: string;
  sickNm: string;
};

interface SearchListProps {
  searchValue: string;
  sickList: SickData[];
}
