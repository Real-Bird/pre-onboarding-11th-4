import { MagnifyingGlass } from "@components/assets";

export const SearchListItem = ({ sickNm }: ListItemProps) => {
  return (
    <div className="flex items-center space-x-4 px-4 hover:bg-gray-100 h-8 cursor-pointer">
      <div className="h-4 w-4 text-gray-400">
        <MagnifyingGlass />
      </div>
      <p dangerouslySetInnerHTML={{ __html: sickNm }} />
    </div>
  );
};

interface ListItemProps {
  sickNm: string;
}
