import { MagnifyingGlass } from "@components/assets";

export const SearchListItem = ({ sickNm }: ListItemProps) => {
  return (
    <div>
      <div className="h-4 w-4">
        <MagnifyingGlass />
      </div>
      <p dangerouslySetInnerHTML={{ __html: sickNm }} />
    </div>
  );
};

interface ListItemProps {
  sickNm: string;
}
