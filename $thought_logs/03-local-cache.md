# Local Cache

## 1. 저장소

- 데이터 양이나 규모를 가늠할 수 없어 기능 구현에 초점
- 상대적으로 다루기 쉬운 `localStorage`에 저장

```
EXPIRY_MINUTE = default 5min (1000 * 60 * 5)
key = searchValue
value = {
  response:state.response,
  saved_at: Date.now() + EXPIRY_MINUTE
}
```

- 배운 바처럼 localStorage 인스턴스를 만들어 유지보수의 유연함과 편의성 도모

## 2. 만료 기한

- 만료 기한을 5분으로 설정하고, 검사하는 로직 추가하여 expiry time 구현

```js
for (const cacheData in localStorage) {
  const dataWillValid = JSON.parse(localStorage.getItem(cacheData));
  if (dataWillValid.saved_at && dataWillValid.saved_at <= Date.now()) {
    localStorage.removeItem(cacheData);
  }
}
```

## 4. pseudo

```js
const 로컬스토리지 = new LocalStorageInstance();
const 캐싱서비스 = new CacheServiceInstance(로컬스토리지);

if (캐싱서비스.검증(searchValue)) {
  setFetchState((prev)=>({...prev, state:캐싱서비스.get(searchValue)}));
  return;
  // api 요청 x
} else {
  // api 요청 o
  캐싱서비스.set(searchValue, fetchState)
}
// 검증 내부 로직
isCacheValid(searchValue) {
  if (this.get(searchValue)) {
    return true;
  } else {
    return false
  }
}

get(searchValue) {
  return this.localStorage.get(searchValue);
}

// 캐싱 제거
for (const 내부요소 in 로컬스토리지) {
  const 로컬스토리지아이템 = JSON.parse(로컬스토리지.get(내부요소));
  if (로컬스토리지아이템.saved_at && 로컬스토리지아이템.saved_at <= Date.now()) {
    로컬스토리지.remove(내부요소);
  }
}

// 캐싱서비스
캐싱서비스.추가(searchValue, fetchState);
// 추가 내부 로직
  private readonly EXPIRY_MINUTES = 1000 * 60 * 5 // 5분

set(searchValue, fetchState){}
const value = {
  state:fetchState,
  saved_at:new Date().getTime() + EXPIRY_MINUTES
로컬스토리지.save(searchValue, value);
}
```

## 5. 고민

- 캐시 서비스 인스턴스를 통째로 보내서 필요할 때 메서드를 꺼내는 게 나은가
- context에서 각 기능을 할당한 후 꺼내 사용하는 게 나은가
- 그게 그건가

### 현재 생각(23-07-19 14:13)

- 인스턴스 생성은 앱 초기화 때 한 번만
  - 필요할 때마다 `new` 쓰는 거 보기 싫음
- 이전처럼 메서드 다 할당해서 꺼내 쓰자
- 하다가 이상하다 싶으면 다시 고민
