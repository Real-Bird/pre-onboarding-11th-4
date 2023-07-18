export class HttpClient {
  protected readonly BASE_URL: string;
  constructor() {
    this.BASE_URL = `http://localhost:4000/`;
  }
  fetch(url: string, options?: RequestInit) {
    return window.fetch(`${this.BASE_URL}${url}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
  }
}
