import { useState } from "react";
import { RequestResponse } from "../api/service";

function useApi(apiCall: Function) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);

  // We want to return true or false to indicate whether
  // the request fails or succeeds
  const request = async (...args: any[]) => {
    let result;

    try {
      setLoading(true);

      result = await apiCall(...args);
      setLoading(false);
      setProgress(null);
      if (!result.ok) {
        setError(true);
      }

      setError(false);
      setData(result);
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
