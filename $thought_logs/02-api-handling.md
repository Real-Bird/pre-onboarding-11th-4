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

## 2. debounce vs throttle

- **debounce** : 일정 시간 동안 이벤트를 감지하고, 변화가 없으면 이벤트 트리거, 변화가 있으면 타이머 초기화
- **throttle** : 일정 시간 동안 이벤트를 받고, 정해진 시간 지난 후 이벤트 트리거, 이후 발생한 이벤트 무시

- 현재 상황에서는 검색어 입력을 기다렸다가 실행해야 하므로 **debounce**가 적절하다고 판단

### 2-1. useDebounce

- 이벤트 콜백과 딜레이를 인자로 받는 함수 리턴
- `boolean`으로 이벤트 감지

  - 이벤트 시작 시 `true`
  - 이벤트 감지 시 `true`
  - 이벤트 미감지 시 `false`

- 딜레이 시간은 `1000ms`

```jsx
function useDebounce() {
  const timerRef = useRef();

  return (eventCb, delay) => {
    // 새로 들어오는 타이머 중복되지 않게 클리어
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => eventCb(), delay);
  };
}
```
