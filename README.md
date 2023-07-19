# 프리온보딩 인턴십 4주 차 과제

> 검색창, 검색어 추천 기능, 캐싱 기능 구현

## 0. 목차

- [1. 최종 구현 화면](#1-최종-구현-화면)
- [2. 설치 및 실행](#2-설치-및-실행)
- [3. Assignments](#3-assignments)
  - [3-1. 검색 영역 클론](#3-1-검색-영역-클론)
  - [3-2. 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현](#3-2-질환명-검색시-api-호출-통해서-검색어-추천-기능-구현)
  - [3-3. API 호출별로 로컬 캐싱 구현](#3-3-api-호출별로-로컬-캐싱-구현)
  - [3-4. 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행](#3-4-입력마다-api-호출하지-않도록-api-호출-횟수를-줄이는-전략-수립-및-실행)
  - [3-5. API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정](#3-5-api를-호출할-때-마다-consoleinfocalling-api-출력을-통해-콘솔창에서-api-호출-횟수-확인이-가능하도록-설정)
  - [3-6. 키보드만으로 추천 검색어들로 이동 가능하도록 구현](#3-6-키보드만으로-추천-검색어들로-이동-가능하도록-구현)

## 1. 최종 구현 화면

[00-assignments-conclusion.webm](https://github.com/Real-Bird/pre-onboarding-11th-4/assets/83404864/62ededfe-f220-47c8-ba18-761f47edcc80)

## 2. 설치 및 실행

```shell
npm install

# run server
npm run server

# run client
npm start
```

## 3. Assignments

### 3-1. 검색 영역 클론

- [최종 구현 화면](#1-최종-구현-화면) 참고
- [한국임상정보원](https://clinicaltrialskorea.com/)의 검색 영역 클론
- 개략적인 와이어 프레임을 분석하고, 그것을 기준삼아 UI를 클론했습니다. [#와이어 프레임 구상.md](./%24thought_logs/01-wire-frame.md)

### 3-2. 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

- [최종 구현 화면](#1-최종-구현-화면) 참고
- 검색어 state가 변경되면 API 요청 메서드를 호출해 검색 결과를 가져왔습니다.
- 검색 결과에서 검색어를 포함한 질환명만 필터링하였고, 원본 사이트처럼 최대 7개의 검색 결과만 추천되도록 구현했습니다.

### 3-3. API 호출별로 로컬 캐싱 구현

- API를 호출하면 검색어를 `key`, 검색 결과를 `value`로 설정하여 `localStorage`에 저장했습니다.
  - `localStorage`를 선택한 이유는 제가 로컬 캐싱 개념을 몰라 구현에 의의를 두자는 마음 때문이었습니다.
  - 가장 친숙한 저장소를 사용해 빠르게 기능을 구현했습니다.
- `expire time`은 저장 시간에 만료 기한을 더한 값을 추가하여 구현하였습니다.

```ts
class CacheService {
  get<T>(searchValue: string): FetchStateType<T> {
    return JSON.parse(this.localStorage.get(searchValue));
  }

  set<T>(searchValue: string, fetchState: T, expiryTime?: number) {
    this.localStorage.save(searchValue, {
      fetchState,
      saved_at: new Date().getTime() + (expiryTime || this.EXPIRY_MINUTES),
    });
  }
}
```

- `localStorage`를 순회하면서 `saved_at`이 현재 시간보다 작거나 같으면 스토리지에서 삭제합니다.

```ts
class CacheService {
  removeExpiryCaches() {
    for (const item in localStorage) {
      const localCacheItem = JSON.parse(this.localStorage.get(item));
      if (localCacheItem?.saved_at && localCacheItem?.saved_at <= Date.now()) {
        this.localStorage.remove(item);
      }
    }
  }
}
```

- 로컬 캐싱에 대한 생각을 나열해 기준으로 삼았습니다. [#로컬 캐시](./%24thought_logs/03-local-cache.md)

### 3-4. 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

- 유저가 검색어 입력을 끝냈는지 알 수 없기 때문에 **호출 시간을 지연**하는 전략을 생각했습니다.
- 입력을 끝내는 지점까지 기다렸다가 일정 시간 이벤트가 없으면 트리거하는 `debounce`가 가장 적절하다고 생각했습니다.
- `useDebounce` 훅을 생성하여 필요한 곳에서 `debounce`를 사용할 수 있도록 구현했습니다.

```ts
export default function useDebounce<T>() {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  return (CallBackFn: CallBackFnType<T>, delay: number) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      CallBackFn();
    }, delay);
  };
}
```

- 실제 사용에서는 `CallBackFn`에 `refetchSickList`를 넣고, 지연 시간은 `1000ms`로 설정했습니다.

```ts
export default function useSickSearch() {
  const debounce = useDebounce();

  useEffect(() => {
    const refetchSickList = async () => {
     // refetch 로직
    };
    debounce(() => refetchSickList(), 1000);
  }, [searchValue]);

  return { ... };
}
```

- [#api handling](./%24thought_logs/02-api-handling.md)에서 api 관련 생각들을 정리해 참고했습니다.

### 3-5. API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

![05-assignments-calling api](https://github.com/Real-Bird/pre-onboarding-11th-4/assets/83404864/f0ae0483-69ab-4e72-939a-04e643d1645f)

- api 요청 시 `finally` 블록에서 `console.info`를 처리하여 성공, 실패에 상관없이 호출 횟수 확인을 설정했습니다.

### 3-6. 키보드만으로 추천 검색어들로 이동 가능하도록 구현

![06-1-assignments-arrow-key-move](https://github.com/Real-Bird/pre-onboarding-11th-4/assets/83404864/364a14f8-cc82-4018-b1a3-0c5cc9b60e60)

- 검색어 입력 후 추천 검색어 리스트가 나오면 `위`와 `아래` 화살표 방향키를 이용해 검색어로 이동할 수 있습니다.
- 키보드 이벤트 고민은 [#move list using keyboard](./%24thought_logs/04-move-list-using-keyboard.md)에 정리했습니다.
