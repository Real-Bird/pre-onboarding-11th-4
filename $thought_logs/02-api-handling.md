# API Handling

## 1. sick list context

- sick context에서 요청 처리
  - `useSick`에서 fetch state 처리 후 context value로 넘겨줌
  - provider는 `search` 컴포넌트에서 사용
- 검색어 입력 전에는 fetch 안 함
- 검색어 입력마다 refetch

## 2. useSickList

```jsx
export default function useSickList() {
  const { getSickList } = useSickListContext();
  const { searchValue } = useSearchContext();
  const [fetchState, setFetchState] = useState({
    state: null,
    loading: true,
    error: null,
  });

  const refetchSickList = useCallBack(async ()=>{
    setFetchState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    try {
      const response = await getSickList(searchValue);
      setFetchState( setFetchState((prev) => ({
        ...prev,
        state: response,
      }));)
    } catch (e) {
      const err = e as Error;
      setFetchState((prev) => ({
        ...prev,
        error: err,
      }));
    } finally {
      setFetchState((prev) => ({ ...prev, loading: false }));
    }
  },[searchValue])

  useEffect(()=>{
    refetchSickList();
  },[])

  return fetchState
}
```
