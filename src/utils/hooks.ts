import React from "react";

type State<T> = { status: string; data: T | null; error: string };

const defaultInitialState = { status: "idle", data: null, error: '' };

function useAsync<T>(initialState: State<T> = defaultInitialState) {
  const initialStateRef = React.useRef({
    ...defaultInitialState,
    ...initialState,
  });

  const [{ data, error, status }, setState] = React.useReducer(
    (state: State<T>, action: Partial<State<T>>): State<T> => ({
      ...state,
      ...action,
    }),
    initialStateRef.current
  );

  const setError = React.useCallback(
    (error: string) => {
      setState({ error, status: "rejected" });
    },
    [setState]
  );

  const setData = React.useCallback(
    (data: T | null) => {
      setState({ data, status: "resolved" });
    },
    [setState]
  );

  const reset = React.useCallback(() => {
    setState(initialStateRef.current);
  }, [setState]);

  const run = React.useCallback(
    (promise: Promise<T | null>) => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }

      setState({ status: "pending" });

      return promise.then(
        (data: T | null) => {
          setData(data);

          return data;
        },
        (error) => {
          setError(error);

          return Promise.reject(error);
        }
      );
    },
    [setData, setError]
  );

  return {
    isIdle: status === "idle",
    isLoading: status === "pending",
    isError: status === "rejected",
    isSuccess: status === "resolved",

    data,
    error,
    status,
    setData,
    setError,
    reset,
    run,
  };
}

export { useAsync };
