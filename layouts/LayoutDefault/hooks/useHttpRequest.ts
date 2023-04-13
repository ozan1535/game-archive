import { useCallback } from "react";

export function useHttpRequest() {
  const sendRequest = useCallback(async (url, data, method) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ data, method }),
    });

    const responseData = await response.json();
  }, []);

  return sendRequest;
}
