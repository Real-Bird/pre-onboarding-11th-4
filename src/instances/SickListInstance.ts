import { HttpClient } from "@instances/HttpClient";
import { SickListData } from "sick";

export class SickListInstance {
  private callingCnt;
  private readonly httpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.callingCnt = 0;
  }

  async getSickList(query: string): Promise<GetSickListResponseType> {
    this.callingCnt = this.callingCnt + 1;
    try {
      const response: SickListData = await (
        await this.httpClient.fetch(`sick?q=${query}`)
      ).json();
      return { ok: true, message: "success", response: response! };
    } catch (e) {
      throw { ok: false, message: "failure", response: null };
    } finally {
      console.info("calling api, count = ", this.callingCnt);
    }
  }
}

export interface GetSickListResponseType {
  ok: boolean;
  message: string;
  response: SickListData;
}
