"use client";

import { type FC, type Reducer } from "react";
import {
  createContextWithName,
  Provider,
  type ReducerActionCreators,
} from "@nathanhfoster/resurrection";
import { resumeSlice, resumeActions } from "./resumeSlice";
import type { ResumeState } from "./types";

// Re-export actions from slice for backward compatibility
export const resumeContextActions = resumeActions;

// Define actions type using slice actions
export type ResumeActions = ReducerActionCreators<
  typeof resumeActions,
  "Resume"
>;

// Create context using slice's initialState and reducer
export const ResumeContext = createContextWithName<ResumeState, ResumeActions>(
  "Resume",
  resumeSlice.initialState,
);

// Destructure context utilities
export const {
  StateContext: ResumeStateContext,
  useSelector: useResumeSelector,
  DispatchContext: ResumeDispatchContext,
  useDispatch: useResumeDispatch,
} = ResumeContext;

// Initializer function using slice's initialState
const getInitialState = (initialState?: Partial<ResumeState>): ResumeState => {
  return {
    ...resumeSlice.initialState,
    ...initialState,
  };
};

// Create provider component using slice's reducer
export const ResumeContextProvider: FC<{
  children: React.ReactNode;
  initialState?: Partial<ResumeState>;
}> = ({ children, initialState, ...restOfProps }) => {
  return (
    <Provider
      {...restOfProps}
      StateContext={ResumeStateContext}
      reducer={resumeSlice.reducer as unknown as Reducer<ResumeState, ResumeActions>}
      initializer={getInitialState}
      DispatchContext={ResumeDispatchContext}
      initialState={initialState}
    >
      {children}
    </Provider>
  );
};

