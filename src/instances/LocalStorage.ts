export class LocalStorage {
  save<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T {
    return localStorage.getItem(key) as T;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
