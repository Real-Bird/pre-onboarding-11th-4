import { Layout } from "@components/commons";
import { Search, SearchListWrapper } from "@components/search";

function App() {
  return (
    <Layout>
      <header>
        <h1>국내 모든 임상시검 검색하고</h1>
        <h1>온라인으로 참여하기</h1>
      </header>
      <Search />
      <SearchListWrapper />
    </Layout>
  );
}

export default App;
