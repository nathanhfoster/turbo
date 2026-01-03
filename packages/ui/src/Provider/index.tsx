import { useMemo } from "react";
import { defaultInitializer, isFunction } from "@monkey-tilt/utils";
import useReducerWithThunk from "../hooks/useReducerWithThunk";
import setStateReducer from "../reducers/setStateReducer";
import type { ProviderProps } from "./types";
import type { ContextStoreInitializer } from "../types";

const Provider = <
  S extends Record<string, any>,
  I extends Record<string, any> = S,
>({
  StateContext,
  reducer = setStateReducer,
  derivedStateFromProps,
  //@ts-expect-error - _currentValue is an internal property of Context
  initialState = derivedStateFromProps ?? StateContext?._currentValue,
  initializer = defaultInitializer as ContextStoreInitializer<S, I>,
  DispatchContext,
  children,
}: ProviderProps<S, I>) => {
  const [state, dispatch, isPending] = useReducerWithThunk<S, I>(
    reducer,
    initialState,
    initializer,
    derivedStateFromProps as Partial<S>
  );

  const renderChildren = useMemo(() => {
    if (isFunction(children)) {
      return children({ state, dispatch, isPending });
    }

    return children;
  }, [children, state, dispatch, isPending]);

  if (!StateContext) {
    return renderChildren;
  }

  const StateContextProvider = StateContext.Provider;

  const stateProvider = (
    <StateContextProvider value={state}>{renderChildren}</StateContextProvider>
  );

  if (!DispatchContext) {
    return stateProvider;
  }

  const DispatchContextProvider = DispatchContext.Provider;

  return (
    <DispatchContextProvider value={dispatch}>
      {stateProvider}
    </DispatchContextProvider>
  );
};

export default Provider;
