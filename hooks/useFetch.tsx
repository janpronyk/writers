import { useEffect, useState } from "react";

export const useFetch = (url: string) => {
  const [data, setData] = useState<any[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setIsPending(true);
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setData(data);
        setError(null);
      } catch (error: any) {
        if (error.name === "AbortError") {
          // console.log("Fetch was aborted");
        } else {
          setError("Could not fetch the data");
        }
      } finally {
        setIsPending(false);
      }
    };
    fetchData();

    return () => controller.abort();
  }, []);

  return { data, isPending, error };
};
