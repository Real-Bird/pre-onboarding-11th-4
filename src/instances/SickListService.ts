import { HttpClient } from "@instances/HttpClient";
import { SickListData } from "sick";

export class SickListService {
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
      return { response: response! };
    } catch (e) {
      throw { response: null };
    } finally {
      console.info("calling api, count = ", this.callingCnt);
    }
  }
}

export interface GetSickListResponseType {
  response: SickListData;
}