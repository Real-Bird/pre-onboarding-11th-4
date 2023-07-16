import { MagnifyingGlass } from "@components/assets";
import { Input } from "@components/commons";

const SearchInput = () => {
  return (
    <div>
      <div className="h-4 w-4">
        <MagnifyingGlass />
      </div>
      <Input placeholder="질환명을 입력해 주세요." />
    </div>
  );
};

export default SearchInput;
