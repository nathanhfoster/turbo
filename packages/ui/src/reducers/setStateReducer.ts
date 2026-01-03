import type { SetStateAction } from 'react';
import { isFunction } from '@monkey-tilt/utils';

const setStateReducer = <S>(prevState: S, action: SetStateAction<S>) =>
  isFunction(action) ? action(prevState) : action;

export default setStateReducer;
