import type { SetStateAction } from 'react';
import { isFunction } from '@nathanhfoster/utils';

const setStateReducer = <S>(prevState: S, action: SetStateAction<S>) =>
  isFunction(action) ? action(prevState) : action;

export default setStateReducer;
