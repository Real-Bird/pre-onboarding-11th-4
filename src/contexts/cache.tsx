import { CacheService, FetchStateType } from "@instances/CacheService";
import { GetSickListResponseType } from "@instances/SickListService";
import { ReactNode, createContext, useContext } from "react";

const CacheContext = createContext<CacheContextType<GetSickListResponseType>>({
  getCache: () => ({ fetchState: { response: [] }, saved_at: 0 }),
  setCache: () => null,
  isCacheValid: () => false,
  removeExpiryCaches: () => null,
});
export const useCacheContext = () => useContext(CacheContext);

const CacheProvider = ({ children, cacheService }: CacheProviderProps) => {
  const getCache = cacheService.get.bind(cacheService);
  const setCache = cacheService.set.bind(cacheService);
  const isCacheValid = cacheService.isCacheValid.bind(cacheService);
  const removeExpiryCaches = cacheService.removeExpiryCaches.bind(cacheService);
  return (
    <CacheContext.Provider
      value={{ getCache, setCache, isCacheValid, removeExpiryCaches }}>
      {children}
    </CacheContext.Provider>
  );
};

interface CacheProviderProps {
  children: ReactNode;
  cacheService: CacheService;
}

export type CacheContextType<T> = {
  getCache: (searchValue: string) => FetchStateType<T>;
  setCache: (searchValue: string, fetchState: T) => void;
  isCacheValid: (searchValue: string) => boolean;
  removeExpiryCaches: () => void;
};

export default CacheProvider;
