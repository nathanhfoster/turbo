export type TestToRun<T = any> = {
  name?: string;
  args?: any;
  expected: T;
};

export type RunTests = (
  callback: (...args: any[]) => any,
  tests: TestToRun<unknown>[],
) => void;

export type GenericFunction = (...args: any[]) => any;

export type SomeCallback<TArgs = any, TResult = void> = (
  ...args: TArgs[]
) => TResult;

export type CallbackSetter<TArgs = any> = (
  callback: SomeCallback<TArgs>,
) => void;
