import { MagnifyingGlass } from "@components/assets";
import { Button } from "@components/commons";

const SearchButton = () => {
  return (
    <Button className="w-12 h-12 bg-[#007BE9] rounded-full p-2 flex justify-center items-center">
      <MagnifyingGlass className="text-white w-6 h-6" />
    </Button>
  );
};

export default SearchButton;
