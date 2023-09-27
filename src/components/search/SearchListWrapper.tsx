import { SearchListItem } from "@components/search/SearchListItem";
import { SickListData } from "sick";
import { cls } from "utils";

export const SearchListWrapper = ({
  searchValue,
  sickList,
  isLoading,
  currentIndex,
}: SearchListProps) => {
  return (
    <ul className="space-y-1 w-full py-6">
      <li key="sickNm" className={cls(currentIndex === 0 ? "bg-gray-100" : "")}>
        <SearchListItem sickNm={searchValue} />
      </li>
      {sickList?.length !== 0 && (
        <span className="text-xs font-semibold px-4">추천 검색어</span>
      )}
      {isLoading ? (
        <li className="font-bold">
          <SearchListItem sickNm={"검색 중..."} />
        </li>
      ) : (
        sickList?.map((sick, idx) => {
          return (
            <li
              key={sick.sickCd}
              className={cls(currentIndex === idx + 1 ? "bg-gray-100" : "")}>
              <SearchListItem sickNm={sick.sickNm} />
            </li>
          );
        })
      )}
    </ul>
  );
};

interface SearchListProps {
  searchValue: string;
  sickList: SickListData | undefined;
  isLoading: boolean;
  currentIndex: number;
}
