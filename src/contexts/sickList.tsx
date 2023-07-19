import {
  GetSickListResponseType,
  SickListService,
} from "@instances/SickListService";
import { ReactNode, createContext, useContext } from "react";

const SickListContext = createContext<SickListContextType>({
  getSickList: () => null,
});
export const useSickListContext = () => useContext(SickListContext);

const SickListProvider = ({
  children,
  sickListService,
}: SickListProviderProps) => {
  const getSickList = sickListService.getSickList.bind(sickListService);
  return (
    <SickListContext.Provider value={{ getSickList }}>
      {children}
    </SickListContext.Provider>
  );
};

interface SickListProviderProps {
  children: ReactNode;
  sickListService: SickListService;
}

interface SickListContextType {
  getSickList: (query: string) => Promise<GetSickListResponseType> | null;
}

export default SickListProvider;
