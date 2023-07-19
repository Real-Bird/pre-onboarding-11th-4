import {
  BlackboardPerson,
  ConversationPersons,
  ExperimentingPerson,
} from "@components/assets";
import { Layout } from "@components/commons";
import { Search } from "@components/search";
import { useCacheContext } from "@contexts/cache";
import { useEffect } from "react";

function App() {
  const { removeExpiryCaches } = useCacheContext();
  useEffect(() => {
    removeExpiryCaches();
  }, []);
  return (
    <Layout>
      <header className="w-full text-center text-4xl font-extrabold">
        <h1>국내 모든 임상시검 검색하고</h1>
        <h1>온라인으로 참여하기</h1>
      </header>
      <div className="w-full mx-auto h-full relative">
        <Search />
        <div className="absolute w-20 left-8 top-24 lg:w-36 lg:left-32 lg:top-14">
          <ConversationPersons />
        </div>
        <div className="absolute w-24 right-8 top-24 lg:w-36 lg:right-28 lg:top-14">
          <BlackboardPerson />
        </div>
        <div className="absolute w-20 right-24 top-32 lg:w-36 lg:right-64 lg:top-20">
          <ExperimentingPerson />
        </div>
      </div>
    </Layout>
  );
}

export default App;
