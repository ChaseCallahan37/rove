import { useState } from "react";
import { RequestResponse } from "../api/service";
import { retrieveToken } from "../auth/token";

function useApi(apiCall: Function, needsToken = false) {
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

      let result;

      if (needsToken) {
        const token = await retrieveToken();
        result = await apiCall(token, ...args);
      } else {
        result = await apiCall(...args);
      }

      setLoading(false);
      setProgress(null);
      if (!result.ok) {
        setError(true);
      }

      setError(false);
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
