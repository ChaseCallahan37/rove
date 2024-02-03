import { useState } from "react";

function useApi(apiCall: Function) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [progress, setProgress] = useState();

  // @ts-ignore
  const request = async (...args) => {
    try {
      setLoading(true);
      const result = await apiCall(...args);

      setLoading(false);
      // @ts-ignore
      setProgress(null);
      if (!result.ok) {
        return setError(true);
      }
      const { data } = await result.json();

      setError(false);
      setData(data);
    } catch (e) {
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
