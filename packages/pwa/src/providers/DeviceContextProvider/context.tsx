"use client";

import { createContextWithName } from "@nathanhfoster/resurrection";
import type { ReducerActionCreators } from "@nathanhfoster/resurrection";
import { deviceInitialState, deviceSlice } from "./slice";
import type { DeviceContextState } from "./types";

export const deviceContextActions = deviceSlice.actions;

export type DeviceActions = ReducerActionCreators<
  typeof deviceContextActions,
  "Device"
>;

export const DeviceContext = createContextWithName<
  DeviceContextState,
  DeviceActions
>("Device", deviceInitialState);

export const {
  StateContext: DeviceStateContext,
  useSelector: useDeviceSelector,
  DispatchContext: DeviceDispatchContext,
  useDispatch: useDeviceDispatch,
} = DeviceContext;
