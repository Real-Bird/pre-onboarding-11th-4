import { LocalStorage } from "@instances/LocalStorage";

export class CacheService {
  protected localStorage;
  private readonly EXPIRY_MINUTES = 1000 * 60;
  constructor(localStorage: LocalStorage) {
    this.localStorage = localStorage;
  }

  get<T>(searchValue: string): FetchStateType<T> {
    return JSON.parse(this.localStorage.get(searchValue));
  }

  set<T>(searchValue: string, fetchState: T) {
    this.localStorage.save(searchValue, {
      fetchState,
      saved_at: new Date().getTime() + this.EXPIRY_MINUTES,
    });
  }

  isCacheValid(searchValue: string) {
    return !!this.get(searchValue);
  }

  removeExpiryCaches() {
    for (const item in localStorage) {
      const localCacheItem = JSON.parse(this.localStorage.get(item));
      if (localCacheItem?.saved_at && localCacheItem?.saved_at <= Date.now()) {
        this.localStorage.remove(item);
      }
    }
  }
}

export type FetchStateType<T> = {
  fetchState: T;
  saved_at: number;
};
