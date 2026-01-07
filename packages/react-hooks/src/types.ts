// Define types locally to avoid circular dependency with @nathanhfoster/ui
// These types are also defined in @nathanhfoster/ui/src/types.ts for consistency

/**
 * Represent a generic function.
 * Used internally to improve code readability
 */
export type GenericFunction = (...args: any[]) => any;

/**
 * Typed generic callback function, used mostly internally
 * to defined callback setters
 */
export type SomeCallback<TArgs, TResult = void> = (...args: TArgs[]) => TResult;

/**
 * A callback setter is generally used to set the value of
 * a callback that will be used to perform updates
 */
export type CallbackSetter<TArgs> = (nextCallback: SomeCallback<TArgs>) => void;

export type DispatchMaybeWithAction<A = any> = (value?: A) => void;

export type ReducerMaybeWithAction<S, A = DispatchMaybeWithAction> = (
  state: S,
  action?: A,
) => S;

export type ContextStoreActionCallback<S> = (state: S) => S;

export type ContextStoreInitializer<S = any, I = S> = (
  initialState?: I extends S ? S : I,
  edit?: boolean,
) => S;

export type PayloadActionType<
  T extends string = string,
  M = never,
  E = never,
> = {
  type: T;
} & ([M] extends [never]
  ? {}
  : {
      meta: M;
    }) &
  ([E] extends [never]
    ? {}
    : {
        error: E;
      });

export type PayloadAction<
  T extends string = string,
  P = any,
  M = never,
  E = never,
> = {
  type: T;
  payload: P;
} & ([M] extends [never]
  ? {}
  : {
      meta: M;
    }) &
  ([E] extends [never]
    ? {}
    : {
        error: E;
      });

export interface BaseActionCreator<P, T extends string, M = never, E = never> {
  type: T;
  match: (
    action: PayloadAction<string, unknown>,
  ) => action is PayloadAction<T, P, M, E>;
}

export interface ActionCreatorWithPayload<P, T extends string = string>
  extends BaseActionCreator<P, T> {
  (payload: P): PayloadAction<T, P>;
}

export type PayloadActionCreator<P = void, T extends string = string> = {
  type: T;
  payload: P;
  (payload: P): { type: T; payload: P };
};

export type Thunk<A, S, P = void> = (
  dispatch: (value?: A) => void,
  getState: () => S,
) => PayloadActionCreator | Promise<P> | Promise<void> | P;

