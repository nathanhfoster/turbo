"use client";

import { type FC, type Reducer } from "react";
import {
  createContextWithName,
  Provider,
  type ReducerActionCreators,
} from "@nathanhfoster/resurrection";
import { resumeSlice } from "./resumeSlice";
import type { ResumeState } from "./types";

// Get action creators
export const resumeContextActions = resumeSlice.actions;

// Define actions type
export type ResumeActions = ReducerActionCreators<
  typeof resumeContextActions,
  "Resume"
>;

// Create context
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

// Initializer function
const getInitialState = (initialState?: Partial<ResumeState>): ResumeState => {
  return {
    ...resumeSlice.initialState,
    ...initialState,
  };
};

// Create provider component
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

