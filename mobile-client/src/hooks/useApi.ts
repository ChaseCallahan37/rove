import { useState } from "react";

import { retrieveToken } from "../auth/token";

function useApi<T>(
  apiCall: (...args: any[]) => Promise<T>,
  needsToken = false
) {
  const [data, setData] = useState<T | null>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(false);
  const [progress, setProgress] = useState<number | null>(null);

  // We want to return true or false to indicate whether
  // the request fails or succeeds
  const request = async (...args: any[]) => {
    try {
      setLoading(true);

      let result: T;

      if (needsToken) {
        const token = await retrieveToken();
        result = await apiCall(token, ...args);
      }
      {
        result = await apiCall(...args);
      }

      setLoading(false);
      setData(result);

      return result;
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
      console.log(e);
    }
  };

  return {
    request,
    data,
    error,
    progress,
    loading,
  };
}

export default useApi;
