import { SearchListItem } from "@components/search/SearchListItem";

export const SearchListWrapper = () => {
  return (
    <ul className="space-y-1 w-full py-6">
      <li key="sickNm">
        <SearchListItem sickNm="아픔" />
      </li>
      <span className="text-xs font-semibold px-4">추천 검색어</span>
      {Array(7)
        .fill(0)
        .map((_, idx) => (
          <li key={idx}>
            <SearchListItem sickNm={String(idx)} />
          </li>
        ))}
    </ul>
  );
};
