import { mockupData } from "mockup/mockupData";

export function cls(...classNames: string[]) {
  return classNames.join(" ");
}

export async function tempFetchData(query: string) {
  const response = mockupData.sick.filter(({ sickNm }) =>
    sickNm.includes(query)
  );
  return new Promise((resolve) => resolve(response));
}
