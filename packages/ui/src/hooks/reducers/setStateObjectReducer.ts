import { isFunction, isObject } from '@monkey-tilt/utils';
import { Reducer, SetStateAction } from 'react';

import { ContextStoreActionCallback, PayloadActionType } from '../../types';

export const SET_STATE_OBJECT_REDUCER_SET = 'SET';

const setStateObjectReducer = <S extends Record<string, any>>(
  state: S,
  action: Partial<S> | SetStateAction<S> | ContextStoreActionCallback<S>,
): S => {
  if (isFunction(action)) {
    return action(state);
  }

  if (isObject(action) && !('type' in action)) {
    return { ...state, ...action };
  }

  if (isObject(action) && 'type' in action) {
    switch (action.type) {
      case SET_STATE_OBJECT_REDUCER_SET:
        return { ...state, ...action.payload };

      default:
        return state;
    }
  }

  return state;
};

export default setStateObjectReducer;
