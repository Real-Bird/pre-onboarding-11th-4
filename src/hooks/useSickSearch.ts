import { useSearchContext } from "@contexts/search";
import { useSickListContext } from "@contexts/sickList";
import useDebounce from "@hooks/useDebounce";
import { GetSickListResponseType } from "@instances/SickListInstance";
import { useEffect, useState } from "react";

export default function useSickSearch() {
  const { getSickList } = useSickListContext();
  const { searchValue } = useSearchContext();
  const [fetchState, setFetchState] = useState<SickFetchStateType>({
    state: null,
    loading: false,
    error: null,
  });
  const debounce = useDebounce();

  useEffect(() => {
    const refetchSickList = async () => {
      if (!searchValue) {
        return;
      }
      try {
        setFetchState((prev) => ({
          ...prev,
          isLoading: true,
        }));
        const response = await getSickList(searchValue);
        setFetchState((prev) => ({
          ...prev,
          state: response,
        }));
      } catch (e) {
        const err = e as Error;
        setFetchState((prev) => ({
          ...prev,
          error: err,
        }));
      } finally {
        setFetchState((prev) => ({ ...prev, loading: false }));
      }
    };
    debounce(() => refetchSickList(), 1000);
  }, [searchValue]);

  return {
    state: fetchState.state,
    loading: fetchState.loading,
    error: fetchState.error,
  };
}

type SickFetchStateType = {
  state: GetSickListResponseType | null;
  loading: boolean;
  error: Error | null;
};
