# Move List Using Keyboard

## 1. 동작 방식

- `useRef`로 `form` 태그 감지
- `formRef`에서 `ul` 감지
- index 세팅 - 초기값 -1(없음)
- keyDown - `ArrowDown(40)`이면 `index + 1`, `ArrowUp(38)`이면 `index - 1`
- list length 넘어가면 `index = list.length - 1 or -1`
- `searchValue` 없으면 동작 x
- 인덱스 같으면 backgroundColor = hover color 변경

## 2. useMoveListKeyDown

```js
function useMoveListKeyDown(filteredListLength) {
  const formRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const { searchValue } = useSearchContext();
  const onKeyDown = (e) => {
    if (!searchValue) {
      return;
    }
    if (e.code === "ArrowDown") {
      e.preventDefault();
      setCurrentIndex((prev) => Math.min(prev + 1, filteredListLength - 1));
    } else if (e.code === "ArrowUp") {
      e.preventDefault();
      setCurrentIndex((prev) => Math.max(prev - 1, -1));
    }
  };

  useEffect(() => {
    if (formRef.current) {
      const allOfLi = formRef.current.querySelectorAll("li");
      allOfLi.forEach((li, idx) => {
        if (idx === currentIndex) {
          li.classList.add("bg-gray-100");
        } else {
          li.classList.remove("bg-gray-100");
        }
      });
    }
  }, [currentIndex]);
}
```
