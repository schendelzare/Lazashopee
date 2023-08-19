"use client";
import { useCallback, useReducer } from "react";

const httpReducers = (currentState, action) => {
  switch (action.type) {
    case "SEND":
      return { loading: true, error: null, data: null };
    case "RESPONSE":
      return { ...currentState, loading: false, data: action.responseData };
    case "ERROR":
      return { ...currentState, error: action.errorData };
    case "CLOSE":
      return { ...currentState, loading: false, error: false };
    default:
      throw new Error("Should not be reached!");
  }
};

const useHttps = () => {
  const [state, dispatch] = useReducer(httpReducers, {
    data: "",
    loading: false,
    error: null,
  });

  const sendRequest = useCallback(
    async (url, method, body, func, router, alert) => {
      try {
        dispatch({ type: "SEND" });
        const response = await fetch(url, {
          method: method,
          body: body,
          cache: "force-cache",
          next: { revalidate: 3600 },
        });
        if (!response.ok) throw new Error(response);
        const data = await response.json();

        dispatch({ type: "RESPONSE", responseData: data });

        func;
        router;
        alert;
      } catch (error) {
        dispatch({ type: "ERROR", errorData: error.message });
      } finally {
      }
    },
    []
  );

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    sendRequest: sendRequest,
  };
};

export default useHttps;
