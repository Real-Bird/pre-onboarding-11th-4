import { HttpClient } from "@instances/HttpClient";
import { SickListData } from "sick";
import { tempFetchData } from "utils";

export class SickListService {
  private callingCnt;
  private readonly httpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.callingCnt = 0;
  }

  async getSickList(query: string): Promise<GetSickListResponseType> {
    this.httpClient;
    this.callingCnt = this.callingCnt + 1;
    try {
      // const response: SickListData = await (
      //   await this.httpClient.fetch(`sick?q=${query}`)
      // ).json();
      const response: SickListData = (await tempFetchData(
        query
      )) as SickListData;
      return {
        response: response!,
      };
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
