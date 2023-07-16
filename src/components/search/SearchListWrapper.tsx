import { SearchListItem } from "@components/search/SearchListItem";

export const SearchListWrapper = () => {
  return (
    <ul>
      <SearchListItem sickNm="아픔" />
      {Array(10)
        .fill(0)
        .map((_, idx) => (
          <li key={idx}>
            <SearchListItem sickNm={String(idx)} />
          </li>
        ))}
    </ul>
  );
};
