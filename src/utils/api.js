import { useEffect, useState } from 'react';

export const useEvents = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const abortController = new AbortController();

    fetch('https://cs394-happening.herokuapp.com/', {signal: abortController.signal})
      .then((res) => {
        setLoading(false);
        setData(res);
        setError(null);
      })
      .catch((err) => setError(err)) 

    return () => {
      abortController.abort();
    }
  }, [])

  return [data, loading, error];
}
