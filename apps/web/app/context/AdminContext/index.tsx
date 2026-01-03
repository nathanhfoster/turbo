"use client";

import {
  createContextWithName,
  Provider,
  type ReducerActionCreators,
} from "@nathanhfoster/resurrection";

import { getAdminInitialState, adminInitialState, adminSlice } from "./reducer";
import type {
  AdminContextProviderProps,
  AdminContextState,
  AdminServerProps,
} from "./types";

export const adminContextActions = adminSlice.actions;

export type AdminActions = ReducerActionCreators<
  typeof adminContextActions,
  "Admin"
>;

export const AdminContext = createContextWithName<
  AdminContextState,
  AdminActions
>("Admin", adminInitialState);

export const {
  StateContext: AdminStateContext,
  useSelector: useAdminSelector,
  DispatchContext: AdminDispatchContext,
  useDispatch: useAdminDispatch,
} = AdminContext;

export const AdminContextProvider = ({
  children,
  ...restOfProps
}: AdminContextProviderProps) => {
  return (
    <Provider<AdminContextState, AdminServerProps>
      {...restOfProps}
      StateContext={AdminStateContext}
      reducer={adminSlice.reducer}
      initializer={getAdminInitialState}
      DispatchContext={AdminDispatchContext}
    >
      {children}
    </Provider>
  );
};
