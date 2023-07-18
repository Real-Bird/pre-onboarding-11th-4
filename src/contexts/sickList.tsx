import {
  GetSickListResponseType,
  SickListInstance,
} from "@instances/SickListInstance";
import { ReactNode, createContext, useContext } from "react";

const SickListContext = createContext<SickListContextType>({
  getSickList: () => null,
});
export const useSickListContext = () => useContext(SickListContext);

const SickListProvider = ({
  children,
  sickListInstance,
}: SickListProviderProps) => {
  const getSickList = sickListInstance.getSickList.bind(sickListInstance);
  return (
    <SickListContext.Provider value={{ getSickList }}>
      {children}
    </SickListContext.Provider>
  );
};

interface SickListProviderProps {
  children: ReactNode;
  sickListInstance: SickListInstance;
}

interface SickListContextType {
  getSickList: (query: string) => Promise<GetSickListResponseType> | null;
}

export default SickListProvider;
