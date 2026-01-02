'use client';

import { useReducer } from 'react';

type ToggleAction = boolean | (() => void) | undefined;

const toggleBooleanReducer = (
  state: boolean,
  action: ToggleAction
): boolean => {
  // If the type of the action is a boolean set the state to the action
  if (typeof action === 'boolean') {
    return action;
  }

  // If it's a function, toggle the state
  if (typeof action === 'function') {
    return !state;
  }

  // Otherwise toggle the state
  return !state;
};

/**
 * Boolean reducer that toggles it's state by default or is overwritten by a passed value
 * @param {boolean=} initializerArg - initial state of the reducer
 * @returns {[boolean, (value?: boolean | (() => void)) => void]} - the new useReducer hook [toggle, setToggle]
 */
const useBooleanToggler = (initializerArg = false) =>
  useReducer(toggleBooleanReducer, Boolean(initializerArg));

export default useBooleanToggler;

