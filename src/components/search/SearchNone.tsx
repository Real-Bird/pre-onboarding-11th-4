export const SearchNone = () => {
  return (
    <div className="space-y-1 w-full py-6 flex flex-col justify-between h-full">
      <div className="space-y-2">
        <p className="text-xs px-4 font-semibold">최근 검색어</p>
        <p className="text-sm font-bold px-4 text-gray-300">
          최근 검색어가 없습니다
        </p>
      </div>
      <hr />
      <p className="text-xs px-4 font-semibold">추천 검색어로 검색해 보세요</p>
      <ul className="flex items-center space-x-2 justify-start px-3">
        {["담낭", "아토피 피부염", "저혈압", "감염", "세균"].map((item) => (
          <li key={item} className="cursor-pointer">
            <div className="px-4 py-1 bg-[#eef8ff] text-[#007fea] rounded-full">
              {item}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
