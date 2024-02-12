import { useState } from "react";

function useApi(apiCall: Function) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState();

  // We want to return true or false to indicate whether
  // the request fails or succeeds
  // @ts-ignore
  const request = async (...args) => {
    let result;

    try {
      setLoading(true);

      result = await apiCall(...args);
      setLoading(false);
      // @ts-ignore
      setProgress(null);
      if (!result.ok) {
        setError(true);
      }

      const { data } = await result.json();

      setError(false);
      setData(data);
    } catch (e) {
      setError(true);
      setLoading(false);
      console.log(e);
    } finally {
      const responseSucceeded = result?.status < 300;
      return responseSucceeded;
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
